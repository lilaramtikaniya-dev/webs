"use client";

import { useRef, useEffect, KeyboardEvent } from "react";
import { Send, Loader2, Paperclip } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
  placeholder = "Ask Runtime Mentor anything...",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSend();
    }
  };

  return (
    <div className="border-t border-white/10 p-4">
      <div className="glass border border-white/15 rounded-2xl flex items-end gap-2 p-2 focus-within:border-neon-blue/40 transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder={placeholder}
          rows={1}
          className="flex-1 bg-transparent resize-none text-sm text-white placeholder-white/30 outline-none px-2 py-2 max-h-40 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20"
        />
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onSend}
          disabled={isLoading || !value.trim()}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity mb-0.5"
        >
          {isLoading ? (
            <Loader2 size={15} className="text-white animate-spin" />
          ) : (
            <Send size={15} className="text-white" />
          )}
        </motion.button>
      </div>
      <p className="text-center text-[10px] text-white/20 mt-2">
        Press <kbd className="bg-white/10 px-1 rounded text-[10px]">Enter</kbd> to send ·{" "}
        <kbd className="bg-white/10 px-1 rounded text-[10px]">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
