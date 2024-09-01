"use client";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { DoubleArrowUpIcon } from "@radix-ui/react-icons";
import { recentChats } from "@/atoms/state";
import { useAtom } from "jotai";

/**
 * 
 * @param data 
 * @returns Demo return format looks like : 
 * {
    "sequence": "I had a lot of fun today!\n",
    "labels": [
        "study",
        "health",
        "programming"
    ],
    "scores": [
        0.3636765778064728,
        0.34209975600242615,
        0.2942236661911011
    ]
* }
 */

async function query(data: string) {
  const queryInputFormat = {
    inputs: data,
    parameters: { candidate_labels: ["programming", "study", "health"] },
  };

  const response = await fetch("/api/query", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(queryInputFormat),
  });

  const result = await response.json();
  console.log("model result - ", result);
  return result;
}

export function ChatInput() {
  const [msgQuery, setMessageQuery] = useState<string | null>();
  const [chats, setChats] = useAtom(recentChats);

  // Only store 5 most recent chats:
  const handleMsgSend = (msg: string) => {
    if (msg === "" || !msg) {
      return;
    }

    if (chats.length < 5) {
      setChats([...chats, msg]);
    } else {
      setChats([...chats.slice(-4), msg]);
    }
  };

  return (
    <div className="relative w-full flex">
      <Textarea
        placeholder="Type your message here."
        className="w-full pr-16"
        value={msgQuery || ""}
        onChange={(e) => setMessageQuery(e.target.value)}
      />
      <Button
        className="absolute right-2 top-5 rounded-full border border-gray-700 transition-colors duration-300 ease-in-out"
        size="icon"
        variant="outline"
        onClick={() => {
          if (msgQuery) {
            query(msgQuery);
            setMessageQuery("");
            handleMsgSend(msgQuery);
          }
        }}
      >
        <DoubleArrowUpIcon />
      </Button>
    </div>
  );
}
