"use client";

import { motion } from "framer-motion";
import { Trash2, Square, Zap, BookOpen, Brain, Target } from "lucide-react";
import { MentorMode, MODES } from "./mode-selector";

interface MentorSidebarProps {
  mode: MentorMode;
  learningLevel: string;
  onLearningLevelChange: (level: string) => void;
  onClearChat: () => void;
  onStopStreaming: () => void;
  isStreaming: boolean;
  onQuickPrompt: (prompt: string) => void;
}

const LEARNING_LEVELS = ["ELI5", "Beginner", "Intermediate", "Advanced"];

const CHALLENGE_DIFFICULTIES = ["Easy", "Medium", "Hard"];

const QUICK_PROMPTS: Record<MentorMode, { label: string; prompt: string }[]> = {
  tutor: [
    { label: "How does a Lexer work?", prompt: "Explain how a lexer works in a JavaScript runtime with C++ code examples." },
    { label: "What is an AST?", prompt: "What is an Abstract Syntax Tree and how is it built from tokens?" },
    { label: "How does scoping work?", prompt: "Explain how variable scoping and the scope chain work in a JavaScript interpreter." },
    { label: "Explain closures", prompt: "How are closures implemented in a JavaScript runtime at the interpreter level?" },
    { label: "How does the call stack work?", prompt: "Explain how the call stack works in a JavaScript runtime with examples." },
  ],
  debugger: [
    { label: "Review my Lexer", prompt: "Please review this lexer code for bugs and suggest improvements:\n\n```cpp\n// Paste your lexer code here\n```" },
    { label: "Fix my Parser", prompt: "Here's my parser code that has an issue with operator precedence:\n\n```cpp\n// Paste your parser code here\n```" },
    { label: "Debug interpreter", prompt: "My interpreter crashes on this input. Help me debug:\n\n```javascript\n// Paste test code here\n```" },
  ],
  learning: [
    { label: "Start with Lexer", prompt: "Teach me about lexers from scratch." },
    { label: "Start with Parsers", prompt: "Teach me about parsers and grammars." },
    { label: "Start with ASTs", prompt: "Teach me about Abstract Syntax Trees." },
    { label: "Interpreter basics", prompt: "Teach me how interpreters evaluate ASTs." },
  ],
  challenge: [
    { label: "Easy challenge", prompt: "Generate an easy practice challenge related to lexing or tokenization." },
    { label: "Medium challenge", prompt: "Generate a medium difficulty challenge about parsing or AST construction." },
    { label: "Hard challenge", prompt: "Generate a hard challenge about interpreter implementation or runtime optimization." },
  ],
};

export default function MentorSidebar({
  mode,
  learningLevel,
  onLearningLevelChange,
  onClearChat,
  onStopStreaming,
  isStreaming,
  onQuickPrompt,
}: MentorSidebarProps) {
  const quickPrompts = QUICK_PROMPTS[mode] || [];

  return (
    <aside className="w-72 border-r border-white/10 flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-sm">
            🤖
          </div>
          <span className="font-semibold text-white text-sm">Runtime Mentor</span>
        </div>
        <p className="text-xs text-white/40">Powered by OpenAI · Streaming</p>
      </div>

      {/* Controls */}
      <div className="p-4 border-b border-white/10 space-y-2">
        {isStreaming ? (
          <button
            onClick={onStopStreaming}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors text-xs font-medium"
          >
            <Square size={12} />
            Stop generating
          </button>
        ) : (
          <button
            onClick={onClearChat}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl glass border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all text-xs font-medium"
          >
            <Trash2 size={12} />
            Clear chat
          </button>
        )}
      </div>

      {/* Learning Level (only in learning mode) */}
      {mode === "learning" && (
        <div className="p-4 border-b border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-3 flex items-center gap-1.5">
            <Brain size={11} />
            Learning Level
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {LEARNING_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => onLearningLevelChange(level)}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  learningLevel === level
                    ? "bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/40 text-white"
                    : "glass border border-white/10 text-white/40 hover:text-white/70"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Prompts */}
      <div className="p-4 flex-1">
        <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-3 flex items-center gap-1.5">
          <Zap size={11} />
          Quick Prompts
        </p>
        <div className="space-y-1.5">
          {quickPrompts.map((qp, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onQuickPrompt(qp.prompt)}
              className="w-full text-left px-3 py-2 rounded-xl glass border border-white/8 text-white/50 hover:text-white/80 hover:border-neon-blue/20 hover:bg-neon-blue/5 transition-all text-xs leading-relaxed"
            >
              {qp.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="glass rounded-xl p-3 border border-white/8">
          <p className="text-[10px] text-white/30 leading-relaxed">
            🔒 Conversations are not stored. Connect your backend at{" "}
            <code className="text-neon-blue/60">NEXT_PUBLIC_API_URL</code> for live AI.
          </p>
        </div>
      </div>
    </aside>
  );
}
