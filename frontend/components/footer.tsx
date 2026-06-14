import Link from "next/link";
import { Terminal, Github, Twitter } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { href: "/playground", label: "Playground" },
      { href: "/docs", label: "Documentation" },
      { href: "/architecture", label: "Architecture" },
      { href: "/leaderboard", label: "Leaderboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/mentor", label: "AI Mentor" },
      { href: "/docs#lexer", label: "Lexer Guide" },
      { href: "/docs#parser", label: "Parser Guide" },
      { href: "/docs#runtime", label: "Runtime Internals" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#roadmap", label: "Roadmap" },
      { href: "/about#team", label: "Team" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple shadow-glow">
                <Terminal className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="font-display text-lg font-bold">
                JSForge<span className="text-gradient">Runtime</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-text-muted">
              An educational JavaScript runtime built from scratch in C++.
              Source code, output, every step in between.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:text-text-primary hover:border-neon-blue/50"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:text-text-primary hover:border-neon-blue/50"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="font-display text-sm font-semibold text-text-primary">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-neon-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} JSForge Runtime. Built for the
            hackathon, open to everyone.
          </p>
          <p className="text-xs text-text-muted">
            Made with <span className="text-gradient font-semibold">C++</span>{" "}
            and a lot of semicolons.
          </p>
        </div>
      </div>
    </footer>
  );
}
