"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import ChatWindow from "@/components/chat-window";
import ChatInput from "@/components/chat-input";
import ModeSelector from "@/components/mode-selector";
import MentorSidebar from "@/components/mentor-sidebar";
import { useChat } from "@/hooks/use-chat";

export default function MentorPage() {
  const {
    messages,
    input,
    setInput,
    isStreaming,
    streamingContent,
    mode,
    setMode,
    learningLevel,
    setLearningLevel,
    sendMessage,
    clearChat,
    stopStreaming,
  } = useChat();

  const handleQuickPrompt = useCallback(
    (prompt: string) => {
      setInput(prompt);
    },
    [setInput]
  );

  return (
    <div className="min-h-screen bg-background pt-16 flex flex-col">
      {/* Page Header */}
      <div className="border-b border-white/10 bg-background/80 backdrop-blur-xl px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              AI Mentor
            </h1>
            <p className="text-sm text-white/40 mt-0.5">
              Your intelligent companion for JSForge Runtime development
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/10 text-xs text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {isStreaming ? "Generating..." : "Ready"}
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex max-w-screen-xl mx-auto w-full overflow-hidden" style={{ height: "calc(100vh - 8rem)" }}>
        
        {/* Sidebar */}
        <MentorSidebar
          mode={mode}
          learningLevel={learningLevel}
          onLearningLevelChange={setLearningLevel}
          onClearChat={clearChat}
          onStopStreaming={stopStreaming}
          isStreaming={isStreaming}
          onQuickPrompt={handleQuickPrompt}
        />

        {/* Chat Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mode Selector Tabs */}
          <ModeSelector activeMode={mode} onModeChange={(m) => { setMode(m); clearChat(); }} />

          {/* Mode Description Banner */}
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-2 border-b border-white/5 bg-neon-blue/5"
          >
            <p className="text-xs text-white/40">
              {mode === "tutor" && "💡 Ask about JavaScript, lexers, parsers, ASTs, interpreters, and runtime internals."}
              {mode === "debugger" && "🐛 Paste your C++ or JavaScript code — get bug analysis, fix suggestions, and complexity review."}
              {mode === "learning" && `🎓 Learning at ${learningLevel} level. Change the level in the sidebar anytime.`}
              {mode === "challenge" && "⚡ Use Quick Prompts to generate practice challenges by difficulty, or describe what you want."}
            </p>
          </motion.div>

          {/* Chat Messages */}
          <ChatWindow
            messages={messages}
            isStreaming={isStreaming}
            streamingContent={streamingContent}
          />

          {/* Input */}
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={sendMessage}
            isLoading={isStreaming}
            placeholder={
              mode === "tutor"
                ? "Ask about JavaScript, compilers, ASTs..."
                : mode === "debugger"
                ? "Paste your code or describe the bug..."
                : mode === "learning"
                ? "What concept do you want to learn?"
                : "Request a challenge or describe what to practice..."
            }
          />
        </main>
      </div>
    </div>
  );
}
