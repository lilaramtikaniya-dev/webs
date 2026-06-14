"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    question: "What is JSForge Runtime?",
    answer:
      "JSForge Runtime is an educational JavaScript engine written entirely in C++. It implements a lexer, parser, AST, and interpreter so you can see exactly how JavaScript code is tokenized, parsed, and executed under the hood.",
  },
  {
    question: "Can I run my own JavaScript code?",
    answer:
      "Yes. Head to the Playground page, write or paste JS code into the Monaco editor, and hit Run. The runtime executes it and streams back the output, execution time, and memory usage.",
  },
  {
    question: "What JavaScript features are supported?",
    answer:
      "Variables, numbers, strings, booleans, arrays, objects, functions and arrow functions, control flow (if/else, switch, for, while, do-while), arithmetic/logical/comparison operators, array and string methods, the Math and Date objects, spread/rest operators, and array methods like map, filter, reduce, find, every, and some.",
  },
  {
    question: "How is this different from V8 or Node.js?",
    answer:
      "JSForge Runtime is not meant to replace V8 — it's an educational implementation built to teach how interpreters work. It's smaller, slower by design, and intentionally transparent so each stage of execution can be inspected.",
  },
  {
    question: "Can the AI Mentor help me debug my own runtime code?",
    answer:
      "Yes. Paste your C++ runtime code, your parser implementation, or any JavaScript snippet into the AI Mentor's debugger. It will analyze the code, point out bugs, suggest fixes, and discuss time/space complexity.",
  },
  {
    question: "Is this project open source?",
    answer:
      "Yes — JSForge Runtime was built for a hackathon and the full source, including the C++ runtime, frontend, and backend, is available on GitHub.",
  },
];

export function FAQAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="space-y-3">
      {FAQ_ITEMS.map((item, i) => (
        <motion.div
          key={item.question}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <Accordion.Item
            value={`item-${i}`}
            className="glass overflow-hidden rounded-xl2"
          >
            <Accordion.Header>
              <Accordion.Trigger
                className={cn(
                  "group flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-medium text-text-primary transition-colors hover:text-neon-cyan"
                )}
              >
                {item.question}
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-neon-cyan"
                  aria-hidden="true"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm text-text-muted data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
              <p className="px-6 pb-5 leading-relaxed">{item.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        </motion.div>
      ))}
    </Accordion.Root>
  );
}
