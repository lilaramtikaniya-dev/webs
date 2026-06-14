"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LeaderboardTable,
  type LeaderboardEntry,
} from "@/components/leaderboard-table";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const MOCK_ENTRIES: LeaderboardEntry[] = [
  { rank: 1, name: "Aarav Mehta", score: 9840, runtimeSpeedMs: 0.31, testCasesPassed: 312, totalTestCases: 312 },
  { rank: 2, name: "Sofia Kim", score: 9510, runtimeSpeedMs: 0.38, testCasesPassed: 308, totalTestCases: 312 },
  { rank: 3, name: "Liam Brooks", score: 9220, runtimeSpeedMs: 0.42, testCasesPassed: 301, totalTestCases: 312 },
  { rank: 4, name: "Mei Tanaka", score: 8890, runtimeSpeedMs: 0.47, testCasesPassed: 295, totalTestCases: 312 },
  { rank: 5, name: "Noah Williams", score: 8640, runtimeSpeedMs: 0.51, testCasesPassed: 290, totalTestCases: 312 },
  { rank: 6, name: "Elena Rodriguez", score: 8410, runtimeSpeedMs: 0.55, testCasesPassed: 286, totalTestCases: 312 },
  { rank: 7, name: "Marcus Chen", score: 8120, runtimeSpeedMs: 0.60, testCasesPassed: 280, totalTestCases: 312 },
  { rank: 8, name: "Priya Nair", score: 7990, runtimeSpeedMs: 0.63, testCasesPassed: 277, totalTestCases: 312 },
];

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(MOCK_ENTRIES);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API_BASE}/leaderboard`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setEntries(data);
        }
      } catch {
        // keep mock data as fallback
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a name.");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/leaderboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) throw new Error("Submission failed");
      const newEntry = await res.json();
      setEntries((prev) =>
        [...prev, newEntry].sort((a, b) => b.score - a.score).map((e, i) => ({ ...e, rank: i + 1 }))
      );
      setName("");
      setShowForm(false);
    } catch {
      // Optimistic mock submission if backend unavailable
      const mockEntry: LeaderboardEntry = {
        rank: entries.length + 1,
        name: name.trim(),
        score: Math.floor(Math.random() * 4000) + 5000,
        runtimeSpeedMs: Math.random() * 1 + 0.3,
        testCasesPassed: Math.floor(Math.random() * 50) + 250,
        totalTestCases: 312,
      };
      setEntries((prev) =>
        [...prev, mockEntry].sort((a, b) => b.score - a.score).map((e, i) => ({ ...e, rank: i + 1 }))
      );
      setName("");
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-grid relative min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 bg-glow-blue-purple opacity-40" />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <TrendingUp className="h-4 w-4 text-neon-cyan" aria-hidden="true" />
            Leaderboard
          </div>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Top <span className="text-gradient">runtime scores</span>
              </h1>
              <p className="mt-2 max-w-lg text-sm text-text-muted">
                Ranked by overall score, combining runtime speed and test
                cases passed against the JSForge conformance suite.
              </p>
            </div>
            <Button onClick={() => setShowForm((s) => !s)} size="sm">
              <Plus className="h-4 w-4" />
              Submit Score
            </Button>
          </div>
        </motion.div>

        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="glass mt-6 flex flex-col gap-3 rounded-xl2 p-5 sm:flex-row sm:items-end"
          >
            <div className="flex-1">
              <label
                htmlFor="leaderboard-name"
                className="text-xs font-medium text-text-muted"
              >
                Your name
              </label>
              <input
                id="leaderboard-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ada Lovelace"
                className="mt-1.5 w-full rounded-lg border border-border bg-black/20 px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-neon-cyan/50 focus:outline-none"
              />
              {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Submit
            </Button>
          </motion.form>
        )}

        <div className="mt-8">
          {loading ? (
            <div className="glass flex items-center justify-center rounded-xl2 p-12">
              <Loader2 className="h-5 w-5 animate-spin text-neon-cyan" aria-hidden="true" />
            </div>
          ) : (
            <LeaderboardTable entries={entries} />
          )}
        </div>
      </div>
    </div>
  );
}
