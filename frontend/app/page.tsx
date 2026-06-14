import {
  Zap,
  Layers,
  Code2,
  Cpu,
  GitBranch,
  Sparkles,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { FeatureCard } from "@/components/feature-card";
import { FAQAccordion } from "@/components/faq-accordion";
import { StatsSection } from "@/components/stats-section";
import { TimelineSection } from "@/components/timeline-section";

const FEATURES = [
  {
    icon: Code2,
    title: "Full Language Core",
    description:
      "Variables, functions, arrow functions, objects, arrays, and all standard control flow — if/else, switch, for, while, and do-while.",
  },
  {
    icon: Layers,
    title: "Lexer → Parser → AST",
    description:
      "Every line of source code is tokenized, parsed into an abstract syntax tree, and walked by the interpreter — all visible and inspectable.",
  },
  {
    icon: Zap,
    title: "Functional Array Methods",
    description:
      "map, filter, reduce, find, every, and some — implemented natively in C++ with real callback support.",
  },
  {
    icon: Cpu,
    title: "Built-in Objects",
    description:
      "Math and Date objects, plus a full library of string and array methods, available out of the box.",
  },
  {
    icon: GitBranch,
    title: "Spread & Rest Operators",
    description:
      "Modern syntax sugar like spread (...arr) and rest parameters (...args) are supported in function calls and definitions.",
  },
  {
    icon: Sparkles,
    title: "AI Runtime Mentor",
    description:
      "An AI coding mentor explains compiler theory, debugs your C++, and generates practice challenges at any difficulty level.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Watching the AST update live as I typed completely changed how I think about parsers. This is the best teaching tool I've used.",
    name: "Priya Nair",
    role: "Hackathon Judge",
  },
  {
    quote:
      "I finally understand the difference between a lexer and a parser. The architecture page makes it click instantly.",
    name: "Marcus Chen",
    role: "CS Student",
  },
  {
    quote:
      "The AI Mentor caught a memory leak in my interpreter loop that I'd been staring at for two days.",
    name: "Elena Rodriguez",
    role: "Hackathon Participant",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Stats */}
      <StatsSection />

      {/* Features */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Everything a runtime needs,
              <br />
              <span className="text-gradient">built from first principles</span>
            </h2>
            <p className="mt-4 text-text-muted">
              JSForge implements the JavaScript language piece by piece —
              every feature below runs through real C++ code, not a wrapper
              around an existing engine.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} index={i} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <TimelineSection />

      {/* Testimonials */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              What people are saying
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="glass animate-in fade-in rounded-xl2 p-6"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Quote className="h-6 w-6 text-neon-purple/60" aria-hidden="true" />
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-purple font-display text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {t.name}
                    </p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-text-muted">
              Everything you need to know about the runtime, the playground,
              and the AI mentor.
            </p>
          </div>

          <div className="mt-12">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="gradient-border glass-strong relative overflow-hidden rounded-2xl px-8 py-16 text-center sm:px-16">
            <div className="absolute inset-0 bg-glow-blue-purple opacity-60" />
            <div className="relative">
              <CheckCircle2 className="mx-auto h-10 w-10 text-neon-cyan" aria-hidden="true" />
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to see JavaScript run
                <br />
                <span className="text-gradient">from the inside out?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-muted">
                Open the playground, write some JS, and watch the lexer,
                parser, and interpreter do their work in real time.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="/playground"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-8 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
                >
                  Open Playground
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
