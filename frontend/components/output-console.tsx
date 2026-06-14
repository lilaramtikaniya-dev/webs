"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, AlertCircle, Clock, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OutputLine {
  type: "log" | "error" | "info";
  text: string;
}

interface OutputConsoleProps {
  lines: OutputLine[];
  isRunning: boolean;
  executionTime: number | null;
  memoryUsage: number | null;
}

export function OutputConsole({
  lines,
  isRunning,
  executionTime,
  memoryUsage,
}: OutputConsoleProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-text-muted">
          <Terminal className="h-4 w-4" aria-hidden="true" />
          Output
        </div>
        <div className="flex items-center gap-4 font-mono text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {executionTime !== null ? `${executionTime.toFixed(2)}ms` : "—"}
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
            {memoryUsage !== null ? `${memoryUsage.toFixed(1)} KB` : "—"}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto bg-black/20 p-4 font-mono text-sm">
        {lines.length === 0 && !isRunning && (
          <p className="text-text-muted">
            // Output will appear here. Press Run to execute your code.
          </p>
        )}

        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "mb-1.5 flex items-start gap-2 leading-relaxed",
                line.type === "error" && "text-red-400",
                line.type === "info" && "text-neon-cyan",
                line.type === "log" && "text-text-primary"
              )}
            >
              {line.type === "error" && (
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
              )}
              <span className="whitespace-pre-wrap break-all">
                {line.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isRunning && (
          <div className="flex items-center gap-2 text-neon-cyan">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-3.5 w-3.5 rounded-full border-2 border-neon-cyan border-t-transparent"
            />
            Running...
          </div>
        )}
      </div>
    </div>
  );
}
