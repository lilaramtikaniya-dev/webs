"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TIMELINE = [
  {
    stage: "Lexer",
    title: "Tokenizing source code",
    description:
      "Raw JavaScript source is scanned character by character and converted into a stream of tokens — keywords, identifiers, operators, and literals.",
  },
  {
    stage: "Parser",
    title: "Building a syntax tree",
    description:
      "Tokens are consumed by a recursive-descent parser that enforces JavaScript grammar and produces a structured tree representation.",
  },
  {
    stage: "AST",
    title: "Abstract Syntax Tree",
    description:
      "The tree captures the program's structure — expressions, statements, and scopes — independent of the original source formatting.",
  },
  {
    stage: "Interpreter",
    title: "Walking the tree",
    description:
      "The interpreter walks the AST node by node, evaluating expressions and executing statements against a runtime environment.",
  },
  {
    stage: "Runtime",
    title: "Memory & execution model",
    description:
      "Variables, scopes, and call stacks are managed in C++ structures that mirror how real JavaScript engines track state.",
  },
];

export function TimelineSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            From source code to{" "}
            <span className="text-gradient">running program</span>
          </h2>
          <p className="mt-4 text-text-muted">
            Five stages turn a string of JavaScript into executed output.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-neon-blue via-neon-purple to-transparent sm:left-1/2"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "relative flex flex-col gap-4 sm:flex-row sm:items-center",
                  i % 2 === 1 && "sm:flex-row-reverse"
                )}
              >
                {/* Node */}
                <div className="absolute left-6 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:left-1/2">
                  <span className="h-3 w-3 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple shadow-glow" />
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "ml-14 glass rounded-xl2 p-6 sm:ml-0 sm:w-[calc(50%-2rem)]",
                    i % 2 === 1 ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                  )}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
                    Stage {i + 1} — {item.stage}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>

                {/* Spacer for the other side on desktop */}
                <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
