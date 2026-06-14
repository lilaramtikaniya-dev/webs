"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/particle-background";

const CODE_LINES = [
  { text: "// JSForge Runtime — write JS, watch C++ run it", color: "text-text-muted" },
  { text: "const numbers = [1, 2, 3, 4, 5];", color: "text-text-primary" },
  { text: "", color: "" },
  { text: "const doubled = numbers", color: "text-text-primary" },
  { text: "  .map(n => n * 2)", color: "text-neon-cyan" },
  { text: "  .filter(n => n > 4);", color: "text-neon-cyan" },
  { text: "", color: "" },
  { text: "console.log(doubled);", color: "text-neon-purple" },
  { text: "// → [6, 8, 10]", color: "text-text-muted" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="absolute inset-0 bg-glow-blue-purple" />
      <ParticleBackground count={50} />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-text-muted">
              <span className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse-glow" />
              Hackathon Project — Live Runtime
            </div>

            <h1 className="mt-6 font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Build JavaScript
              <br />
              <span className="text-gradient">From Scratch</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-text-muted">
              An educational JavaScript Runtime built in C++ — from lexer to
              parser to AST to interpreter. Watch it run real JS code, line by
              line, in your browser.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/playground">
                  Try Runtime
                  <Play className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">
                  View Documentation
                  <BookOpen className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm text-text-muted">
              <Link
                href="/architecture"
                className="group inline-flex items-center gap-1.5 transition-colors hover:text-neon-cyan"
              >
                See how it works
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right: animated code editor preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-2xl bg-hero-gradient opacity-20 blur-2xl" />
            <div className="gradient-border glass-strong relative overflow-hidden rounded-2xl shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
                <span className="ml-3 font-mono text-xs text-text-muted">
                  runtime.js
                </span>
              </div>

              {/* Code body */}
              <div className="space-y-1 p-6 font-mono text-sm leading-relaxed">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
                    className={line.color || "text-transparent"}
                  >
                    {line.text || "\u00A0"}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="mt-2 inline-block h-4 w-2 bg-neon-cyan"
                />
              </div>

              {/* Output strip */}
              <div className="border-t border-border bg-black/30 px-6 py-3 font-mono text-xs text-neon-cyan">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.8 }}
                >
                  ✓ Executed in 0.4ms — 0 errors
                </motion.span>
              </div>
            </div>

            {/* Floating accent badges */}
            <motion.div
              className="absolute -right-6 -top-6 glass rounded-xl px-3 py-2 text-xs font-medium shadow-glow"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              AST → Interpreter
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -left-6 glass rounded-xl px-3 py-2 text-xs font-medium shadow-glow-purple"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              Written in C++
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
