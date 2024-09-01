import { supabase } from "@/lib/supabase";

// get all users:
export async function getUserInfo() {
  let { data: USER_INFO, error } = await supabase.from("USER_INFO").select("*");

  return { USER_INFO, error };
}

export async function updateUserLabels(userId: string, newLabels: string[]) {
  let { data, error } = await supabase
    .from("USER_INFO")
    .select("parameters")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 is the code for "No rows found"
    throw error;
  }

  let parameters = data?.parameters || {};
  let existingLabels = parameters.labels || [];

  // Add new labels that are not already present
  newLabels.forEach((label) => {
    if (!existingLabels.includes(label)) {
      existingLabels.push(label);
    }
  });

  parameters.labels = existingLabels;

  let { data: updateData, error: updateError } = await supabase
    .from("USER_INFO")
    .upsert({ user_id: userId, parameters }, { onConflict: "user_id" });

  if (updateError) {
    throw updateError;
  }

  return updateData;
}

// Fetch all labels corresponding to a user ID
export async function getUserLabels(userId: string): Promise<string[]> {
  let { data, error } = await supabase
    .from("USER_INFO")
    .select("parameters")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    console.error("No data found for user...");
    return [];
  }

  let parameters = data.parameters || {};
  let labels = parameters.labels || [];

  return labels;
}
