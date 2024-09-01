'use client'
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { DoubleArrowUpIcon } from "@radix-ui/react-icons";

async function query(data: string) {
  const queryInputFormat = {"inputs": data, "parameters": {"candidate_labels": ["programming", "study", "health"]}}

  const response = await fetch("/api/query", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(queryInputFormat),
  });

  const result = await response.json();
  console.log("model result - ", result)
  return result;
}

export function ChatInput() {

  const [msgQuery, setMessageQuery] = useState<string | null> ();

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
          }
        }}
      >
        <DoubleArrowUpIcon />
      </Button>
    </div>
  )
}
