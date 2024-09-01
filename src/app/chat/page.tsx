import { ChatInput } from "@/components/Chat";
import { MessageBox } from "@/components/MessageBox";
import { currentUser } from "@clerk/nextjs/server";

export default async function ChatPage() {
  const user = await currentUser();
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 px-4 py-6 lg:p-24">
      <div className="text-[2rem] font-medium">Hi {user?.firstName}!</div>

      {/* Text Messages */}
      <div className="w-full flex flex-col gap-6">
        <MessageBox text="something lol" />
        <MessageBox text="Hey wassup" />
        <MessageBox text="Ok im doing something" />
      </div>

      <footer className="max-lg:w-[calc(100%-2rem)] lg:w-[calc(100%-8rem)] fixed bottom-4">
        <ChatInput />
      </footer>
    </main>
  );
}
