"use client";

import { motion } from "framer-motion";
import { BookOpen, Bug, Layers, Zap } from "lucide-react";

export type MentorMode = "tutor" | "debugger" | "learning" | "challenge";

const MODES: { id: MentorMode; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "tutor",
    label: "AI Tutor",
    icon: <BookOpen size={15} />,
    description: "Ask anything about JS, compilers, ASTs, and runtime internals.",
  },
  {
    id: "debugger",
    label: "Debugger",
    icon: <Bug size={15} />,
    description: "Paste C++ or JS code. Get bug analysis, fix suggestions, complexity review.",
  },
  {
    id: "learning",
    label: "Learning Mode",
    icon: <Layers size={15} />,
    description: "Choose your depth: ELI5, Beginner, Intermediate, or Advanced.",
  },
  {
    id: "challenge",
    label: "Challenges",
    icon: <Zap size={15} />,
    description: "Generate practice challenges by difficulty to sharpen your skills.",
  },
];

interface ModeSelectorProps {
  activeMode: MentorMode;
  onModeChange: (mode: MentorMode) => void;
}

export default function ModeSelector({ activeMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="border-b border-white/10 px-4 py-3">
      <div className="flex gap-1 overflow-x-auto scrollbar-none">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeMode === mode.id
                ? "text-white"
                : "text-white/40 hover:text-white/70 hover:bg-white/5"
            }`}
          >
            {activeMode === mode.id && (
              <motion.div
                layoutId="active-mode-bg"
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className={`relative z-10 ${activeMode === mode.id ? "text-neon-blue" : ""}`}>
              {mode.icon}
            </span>
            <span className="relative z-10">{mode.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { MODES };
