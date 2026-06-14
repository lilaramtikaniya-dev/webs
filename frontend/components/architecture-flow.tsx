"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FileCode2, ScanText, ListTree, GitBranch, Cog, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stage {
  id: string;
  label: string;
  sublabel: string;
  icon: typeof FileCode2;
}

const STAGES: Stage[] = [
  { id: "source", label: "Source Code", sublabel: "Raw .js text", icon: FileCode2 },
  { id: "lexer", label: "Lexer", sublabel: "Tokens", icon: ScanText },
  { id: "parser", label: "Parser", sublabel: "Grammar rules", icon: GitBranch },
  { id: "ast", label: "AST", sublabel: "Syntax tree", icon: ListTree },
  { id: "interpreter", label: "Interpreter", sublabel: "Tree-walking eval", icon: Cog },
  { id: "output", label: "Output", sublabel: "Console / values", icon: Monitor },
];

export function ArchitectureFlow() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-10">
      <div className="absolute inset-0 bg-glow-blue-purple opacity-40" />

      {/* Desktop: horizontal flow */}
      <div className="relative hidden items-center justify-between lg:flex">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="flex items-center">
            <StageNode
              stage={stage}
              isHovered={hovered === stage.id}
              onHover={setHovered}
            />
            {i < STAGES.length - 1 && <FlowConnector index={i} />}
          </div>
        ))}
      </div>

      {/* Mobile/tablet: vertical flow */}
      <div className="relative flex flex-col items-center gap-2 lg:hidden">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="flex flex-col items-center">
            <StageNode
              stage={stage}
              isHovered={hovered === stage.id}
              onHover={setHovered}
              vertical
            />
            {i < STAGES.length - 1 && <FlowConnector index={i} vertical />}
          </div>
        ))}
      </div>
    </div>
  );
}

function StageNode({
  stage,
  isHovered,
  onHover,
  vertical = false,
}: {
  stage: Stage;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  vertical?: boolean;
}) {
  const Icon = stage.icon;

  return (
    <motion.button
      onMouseEnter={() => onHover(stage.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(stage.id)}
      onBlur={() => onHover(null)}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl2 border border-border px-4 py-4 text-center transition-all duration-300",
        vertical ? "w-40" : "w-28 sm:w-36",
        isHovered
          ? "border-neon-cyan/50 bg-white/5 shadow-glow"
          : "bg-black/20"
      )}
      aria-label={`${stage.label}: ${stage.sublabel}`}
    >
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-lg transition-colors",
          isHovered
            ? "bg-gradient-to-br from-neon-blue to-neon-purple text-white"
            : "bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 text-neon-cyan"
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="font-display text-sm font-semibold text-text-primary">
          {stage.label}
        </p>
        <p className="mt-0.5 text-xs text-text-muted">{stage.sublabel}</p>
      </div>
    </motion.button>
  );
}

function FlowConnector({
  index,
  vertical = false,
}: {
  index: number;
  vertical?: boolean;
}) {
  if (vertical) {
    return (
      <div className="relative h-10 w-px bg-gradient-to-b from-neon-blue/40 via-neon-purple/40 to-neon-cyan/40">
        <motion.div
          className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-neon-cyan shadow-glow"
          animate={{ y: [0, 36, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative mx-2 h-px w-8 bg-gradient-to-r from-neon-blue/40 via-neon-purple/40 to-neon-cyan/40 sm:w-12 lg:w-10">
      <motion.div
        className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-neon-cyan shadow-glow"
        animate={{ x: [0, 40, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
      />
    </div>
  );
}
