import { ChatInput } from "@/components/Chat";
import { ChatContainer } from "@/components/MessageBox";
import { currentUser } from "@clerk/nextjs/server";

export default async function ChatPage() {
  const user = await currentUser();
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 px-4 py-6 lg:p-24">
      <div className="text-[2rem] font-medium">Hi {user?.firstName}!</div>

      {/* Text Messages */}
      <div className="w-full flex flex-col">
        <ChatContainer />
      </div>

      <footer className="max-lg:w-[calc(100%-2rem)] lg:w-[calc(100%-8rem)] fixed bottom-4">
        <ChatInput />
      </footer>
    </main>
  );
}
