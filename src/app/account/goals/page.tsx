"use client";

import { useEffect, useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { getUserLabels, updateUserLabels } from "@/db/user";

export default function Component() {
  const { user } = useUser();
  const [newBubbleText, setNewBubbleText] = useState("");
  const [bubbles, setBubbles] = useState([
    { id: 1, text: "Work", selected: false },
    { id: 2, text: "Personal relations", selected: false },
    { id: 3, text: "Health", selected: false },
    { id: 4, text: "Learning", selected: false },
    { id: 6, text: "Investing", selected: false },
  ]);

  useEffect(() => {
    const fetchUserLabels = async () => {
      if (user) {
        const userLabels = await getUserLabels(user?.id);

        setBubbles((prevBubbles) => {
          const updatedBubbles = prevBubbles.map((bubble) => {
            if (userLabels.includes(bubble.text)) {
              return { ...bubble, selected: true };
            }
            return bubble;
          });

          const newBubbles = userLabels
            .filter(
              (label) => !prevBubbles.some((bubble) => bubble.text === label)
            )
            .map((label, index) => ({
              id: Math.max(...prevBubbles.map((b) => b.id)) + index + 1,
              text: label,
              selected: true,
            }));

          return [...updatedBubbles, ...newBubbles];
        });
      }
    };
    fetchUserLabels();
  }, [user]);

  const handleUpdateClick = () => {
    const selectedBubblesText = bubbles
      .filter((bubble) => bubble.selected)
      .map((bubble) => bubble.text);

    const res = updateUserLabels(user!.id, selectedBubblesText);
  };

  const toggleBubble = (id: number) => {
    setBubbles(
      bubbles.map((bubble) =>
        bubble.id === id ? { ...bubble, selected: !bubble.selected } : bubble
      )
    );
  };

  const addBubble = () => {
    if (newBubbleText.trim()) {
      setBubbles([
        ...bubbles,
        {
          id: Math.max(...bubbles.map((b) => b.id)) + 1,
          text: newBubbleText.trim(),
          selected: true,
        },
      ]);
      setNewBubbleText("");
    }
  };

  const removeBubble = (id: number) => {
    setBubbles(bubbles.filter((bubble) => bubble.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 px-4 py-6 lg:p-12">
      <div className="w-full mx-auto p-4 space-y-8">
        <h2 className="text-2xl font-bold text-center mb-6">My Categories</h2>

        <div className="flex items-center justify-center gap-2">
          <Input
            type="text"
            placeholder="Add new category"
            value={newBubbleText}
            onChange={(e) => setNewBubbleText(e.target.value)}
            className="max-w-md"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addBubble();
              }
            }}
          />
          <Button onClick={addBubble} size="icon">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className={`
              relative group px-4 py-2 rounded-full text-sm font-medium 
              transition-all duration-300 ease-in-out cursor-pointer
              transform hover:scale-105
              ${
                bubble.selected
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-muted hover:bg-muted/80"
              }
            `}
              onClick={() => toggleBubble(bubble.id)}
            >
              {bubble.text}
              <span
                className={`
                absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full 
                border-2 border-background transition-all duration-300 ease-in-out
                ${
                  bubble.selected
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0"
                }
              `}
              ></span>
              <button
                className={`
                absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground 
                rounded-full transition-all duration-300 ease-in-out flex items-center justify-center
                ${
                  bubble.selected
                    ? "opacity-0 scale-0"
                    : "opacity-0 group-hover:opacity-100 group-hover:scale-100"
                }
              `}
                onClick={(e) => {
                  e.stopPropagation();
                  removeBubble(bubble.id);
                }}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-center">
            Selected Categories
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {bubbles
              .filter((bubble) => bubble.selected)
              .map((bubble) => (
                <div
                  key={bubble.id}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {bubble.text}
                </div>
              ))}
          </div>
        </div>

        {bubbles.filter((bubble) => bubble.selected).length > 0 ? (
          <div className="w-full flex items-center justify-center">
            <Button
              onClick={() => handleUpdateClick()}
              className="hover:bg-green-400 transition-colors duration-300 ease-in-out"
            >
              Update
            </Button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
