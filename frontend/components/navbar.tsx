"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/playground", label: "Playground" },
  { href: "/docs", label: "Documentation" },
  { href: "/architecture", label: "Architecture" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/mentor", label: "AI Mentor" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple shadow-glow transition-transform group-hover:scale-105">
              <Terminal className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              JSForge<span className="text-gradient">Runtime</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text-primary hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="outline" size="sm" asChild>
              <Link href="/about">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/playground">Try Runtime</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-primary lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={cn("overflow-hidden lg:hidden glass-strong border-b border-border")}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:text-text-primary hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/about">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/playground">Try Runtime</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
