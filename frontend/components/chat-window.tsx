"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./message-bubble";
import TypingIndicator from "./typing-indicator";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
  isStreaming: boolean;
  streamingContent: string;
}

export default function ChatWindow({
  messages,
  isStreaming,
  streamingContent,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20">
      <AnimatePresence initial={false}>
        {messages.length === 0 && !isStreaming && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full min-h-[300px] text-center gap-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-white/10 flex items-center justify-center text-3xl">
              🤖
            </div>
            <div>
              <p className="text-white/80 font-semibold text-lg">Runtime Mentor is ready</p>
              <p className="text-white/40 text-sm mt-1">
                Ask anything about JavaScript, compilers, ASTs, or runtime internals.
              </p>
            </div>
          </motion.div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isStreaming && (
          <motion.div
            key="streaming"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {streamingContent ? (
              <MessageBubble
                message={{
                  id: "streaming",
                  role: "assistant",
                  content: streamingContent,
                  timestamp: new Date(),
                }}
                isStreaming
              />
            ) : (
              <TypingIndicator />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={bottomRef} />
    </div>
  );
}
