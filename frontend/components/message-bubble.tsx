"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Bot, User } from "lucide-react";
import { useState } from "react";
import { Message } from "./chat-window";

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white/60 hover:text-white"
      title="Copy code"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

export default function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 ${
          isUser
            ? "bg-gradient-to-br from-neon-blue to-neon-purple"
            : "bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 border border-white/10"
        }`}
      >
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <Bot size={14} className="text-neon-blue" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 text-white rounded-tr-sm"
            : "glass border border-white/10 text-white/90 rounded-tl-sm"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none
            prose-headings:text-white prose-headings:font-semibold
            prose-p:text-white/85 prose-p:leading-relaxed
            prose-strong:text-white prose-strong:font-semibold
            prose-em:text-neon-blue/90
            prose-ul:text-white/80 prose-ol:text-white/80
            prose-li:marker:text-neon-blue
            prose-blockquote:border-neon-purple/50 prose-blockquote:text-white/60
            prose-hr:border-white/10
            prose-a:text-neon-blue prose-a:no-underline hover:prose-a:underline
          ">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeString = String(children).replace(/\n$/, "");

                  if (!inline && match) {
                    return (
                      <div className="relative my-3 rounded-xl overflow-hidden border border-white/10">
                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                          <span className="text-xs text-neon-blue font-mono font-medium uppercase tracking-wider">
                            {match[1]}
                          </span>
                          <CopyButton text={codeString} />
                        </div>
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            padding: "1rem",
                            background: "rgba(0,0,0,0.4)",
                            fontSize: "0.8rem",
                            lineHeight: "1.6",
                          }}
                          {...props}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }

                  return (
                    <code
                      className="px-1.5 py-0.5 rounded bg-white/10 text-neon-blue font-mono text-xs"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
            {isStreaming && (
              <span className="inline-block w-1.5 h-4 bg-neon-blue ml-0.5 animate-pulse rounded-sm" />
            )}
          </div>
        )}

        {/* Timestamp */}
        <p className={`text-[10px] mt-2 ${isUser ? "text-white/30 text-right" : "text-white/25"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </motion.div>
  );
}
