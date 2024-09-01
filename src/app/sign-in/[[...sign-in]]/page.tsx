import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <div className="text-[2rem] font-medium">hi, welcome back!</div>
      <SignIn />
    </main>
  );
}
