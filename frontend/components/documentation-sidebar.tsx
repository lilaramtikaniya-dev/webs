"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DocSection {
  id: string;
  title: string;
}

interface DocumentationSidebarProps {
  sections: DocSection[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function DocumentationSidebar({
  sections,
  activeId,
  onSelect,
}: DocumentationSidebarProps) {
  const [query, setQuery] = useState("");

  const filtered = sections.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <nav className="glass sticky top-24 flex h-fit max-h-[calc(100vh-7rem)] flex-col rounded-xl2 p-4">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search docs..."
          aria-label="Search documentation"
          className="w-full rounded-lg border border-border bg-black/20 py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-neon-cyan/50 focus:outline-none"
        />
      </div>

      <ul className="mt-4 space-y-1 overflow-y-auto">
        {filtered.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onSelect(section.id)}
              className={cn(
                "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                activeId === section.id
                  ? "bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-cyan font-medium"
                  : "text-text-muted hover:bg-white/5 hover:text-text-primary"
              )}
              aria-current={activeId === section.id ? "true" : undefined}
            >
              {section.title}
            </button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-3 py-2 text-sm text-text-muted">
            No sections found.
          </li>
        )}
      </ul>
    </nav>
  );
}
