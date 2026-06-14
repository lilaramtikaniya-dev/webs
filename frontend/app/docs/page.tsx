"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";
import {
  DocumentationSidebar,
  type DocSection,
} from "@/components/documentation-sidebar";
import { CodeBlock } from "@/components/code-block";
import { DOCS } from "@/lib/docs-content";

const SECTIONS: DocSection[] = DOCS.map((d) => ({ id: d.id, title: d.title }));

export default function DocsPage() {
  const [activeId, setActiveId] = useState(DOCS[0].id);
  const active = DOCS.find((d) => d.id === activeId) ?? DOCS[0];

  return (
    <div className="bg-grid relative min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 bg-glow-blue-purple opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <BookOpen className="h-4 w-4 text-neon-cyan" aria-hidden="true" />
          Documentation
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          How the <span className="text-gradient">runtime</span> works
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-text-muted">
          A walkthrough of every stage of the JSForge Runtime — from raw
          source text to executed JavaScript — with the actual C++ that
          implements each stage.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <DocumentationSidebar
            sections={SECTIONS}
            activeId={activeId}
            onSelect={setActiveId}
          />

          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="glass rounded-xl2 p-6 sm:p-8"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
                Stage — {active.title}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                {active.title}
              </h2>
              <p className="mt-1 text-text-muted">{active.description}</p>

              <div className="mt-6 space-y-4">
                {active.body.map((paragraph, i) => (
                  <p key={i} className="text-sm leading-relaxed text-text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              {active.code && (
                <div className="mt-6">
                  <CodeBlock
                    code={active.code.code}
                    language={active.code.language}
                    filename={active.code.filename}
                  />
                </div>
              )}
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
