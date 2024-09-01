"use client";
import { recentChats } from "@/atoms/state";
import { useAtom } from "jotai";

interface MessageBoxProps {
  text: string;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ text }) => {
  return (
    <div
      className="flex justify-start items-start text-left p-4 border-b border-l rounded-md opacity-80  w-[25rem]
    shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
    >
      {text}
    </div>
  );
};

export const ChatContainer = () => {
  const [chats, setChats] = useAtom(recentChats);

  return (
    <div className="flex flex-col gap-8">
      {chats && chats.length === 0 ? (
        <p>So what you upto?</p>
      ) : (
        chats.map((chat, index) => {
          return <MessageBox key={index} text={chat} />;
        })
      )}
    </div>
  );
};
