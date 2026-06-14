"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Zap, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  runtimeSpeedMs: number;
  testCasesPassed: number;
  totalTestCases: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const RANK_STYLES: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-slate-300",
  3: "text-amber-600",
};

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <div className="glass overflow-hidden rounded-xl2">
      {/* Header row - desktop */}
      <div className="hidden grid-cols-[80px_1fr_140px_160px_180px] gap-4 border-b border-border px-6 py-3 text-xs font-medium uppercase tracking-wider text-text-muted sm:grid">
        <div>Rank</div>
        <div>Name</div>
        <div className="text-right">Score</div>
        <div className="text-right">Runtime Speed</div>
        <div className="text-right">Test Cases Passed</div>
      </div>

      <div className="divide-y divide-border">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className={cn(
              "grid grid-cols-2 gap-3 px-6 py-4 transition-colors hover:bg-white/5 sm:grid-cols-[80px_1fr_140px_160px_180px] sm:items-center sm:gap-4"
            )}
          >
            {/* Rank */}
            <div className="flex items-center gap-2">
              {entry.rank <= 3 ? (
                entry.rank === 1 ? (
                  <Trophy
                    className={cn("h-5 w-5", RANK_STYLES[entry.rank])}
                    aria-hidden="true"
                  />
                ) : (
                  <Medal
                    className={cn("h-5 w-5", RANK_STYLES[entry.rank])}
                    aria-hidden="true"
                  />
                )
              ) : (
                <span className="font-mono text-sm text-text-muted">
                  #{entry.rank}
                </span>
              )}
            </div>

            {/* Name */}
            <div className="flex items-center gap-3 sm:col-span-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-purple font-display text-xs font-bold text-white">
                {entry.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-text-primary">
                {entry.name}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center justify-between text-sm sm:justify-end">
              <span className="text-text-muted sm:hidden">Score</span>
              <span className="font-mono font-semibold text-gradient">
                {entry.score.toLocaleString()}
              </span>
            </div>

            {/* Runtime speed */}
            <div className="flex items-center justify-between text-sm sm:justify-end">
              <span className="flex items-center gap-1 text-text-muted sm:hidden">
                <Zap className="h-3.5 w-3.5" /> Speed
              </span>
              <span className="font-mono text-text-primary">
                {entry.runtimeSpeedMs.toFixed(2)}ms
              </span>
            </div>

            {/* Test cases */}
            <div className="flex items-center justify-between text-sm sm:justify-end sm:gap-2">
              <span className="flex items-center gap-1 text-text-muted sm:hidden">
                <ListChecks className="h-3.5 w-3.5" /> Tests
              </span>
              <div className="flex items-center gap-2 sm:w-full sm:justify-end">
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10 sm:w-24">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan"
                    style={{
                      width: `${
                        (entry.testCasesPassed / entry.totalTestCases) * 100
                      }%`,
                    }}
                  />
                </div>
                <span className="font-mono text-xs text-text-muted">
                  {entry.testCasesPassed}/{entry.totalTestCases}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
