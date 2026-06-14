"use client";

import { motion } from "framer-motion";
import { Workflow } from "lucide-react";
import { ArchitectureFlow } from "@/components/architecture-flow";
import { DOCS } from "@/lib/docs-content";
import Link from "next/link";

const STAGE_SUMMARIES = [
  {
    title: "Source Code",
    detail:
      "The pipeline begins with raw JavaScript text — exactly what you type into the Playground editor.",
  },
  {
    title: "Lexer",
    detail:
      "Converts characters into a flat stream of tokens: keywords, identifiers, literals, punctuation, and operators.",
  },
  {
    title: "Parser",
    detail:
      "Consumes tokens and applies JavaScript grammar rules to produce a structured tree, enforcing operator precedence and statement structure.",
  },
  {
    title: "AST",
    detail:
      "The Abstract Syntax Tree — a hierarchy of typed nodes representing the program's structure, independent of formatting.",
  },
  {
    title: "Interpreter",
    detail:
      "Walks the AST node by node using the visitor pattern, evaluating expressions and executing statements against a runtime environment.",
  },
  {
    title: "Output",
    detail:
      "Side effects (console.log), return values, and errors are surfaced back to the Playground's output console.",
  },
];

export default function ArchitecturePage() {
  return (
    <div className="bg-grid relative min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 bg-glow-blue-purple opacity-40" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Workflow className="h-4 w-4 text-neon-cyan" aria-hidden="true" />
            Architecture
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Source code to{" "}
            <span className="text-gradient">running program</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            JSForge processes every program through six stages. Hover or
            focus a node below to see how it fits into the pipeline.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8"
        >
          <ArchitectureFlow />
        </motion.div>

        {/* Stage breakdown grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAGE_SUMMARIES.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass rounded-xl2 p-5"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {stage.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Deep dive CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="gradient-border glass-strong mt-12 rounded-2xl p-8 text-center"
        >
          <h2 className="font-display text-2xl font-bold">
            Want the implementation details?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-text-muted">
            The Documentation page covers each of these {DOCS.length} stages
            in depth, with real C++ source from the runtime.
          </p>
          <Link
            href="/docs"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-6 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            Read the Documentation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
