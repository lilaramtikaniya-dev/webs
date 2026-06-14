"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Code2, Target, Map, Users, Zap, CheckCircle2, Circle, Clock } from "lucide-react";

const TEAM = [
  {
    name: "Lokesh Gendu",
    role: "Lead Developer",
    bio: "Building the JSForge runtime from scratch in C++. Loves compilers and language design.",
    avatar: "LG",
    github: "#",
    twitter: "#",
    linkedin: "#",
  },
];

const GOALS = [
  "Build a fully functional JavaScript interpreter in C++",
  "Support core JS features: variables, functions, closures, loops",
  "Implement a complete lexer, parser, and AST evaluator",
  "Create an online playground for live code execution",
  "Achieve educational clarity for compiler/runtime learners",
  "Provide an AI mentor for guiding runtime development",
];

const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Core Runtime",
    status: "complete",
    items: ["Lexer & Tokenizer", "Recursive Descent Parser", "AST Node Types", "Basic Interpreter"],
  },
  {
    phase: "Phase 2",
    title: "Language Features",
    status: "complete",
    items: ["Variables (let, const)", "Functions & Closures", "If/Else, Loops", "Arithmetic & Logic Ops"],
  },
  {
    phase: "Phase 3",
    title: "Advanced Types",
    status: "in-progress",
    items: ["Arrays & Methods", "Objects", "String Methods", "Math & Date Objects"],
  },
  {
    phase: "Phase 4",
    title: "Higher-Order JS",
    status: "upcoming",
    items: ["map/filter/reduce", "Arrow Functions", "Spread & Rest Ops", "Callback Functions"],
  },
  {
    phase: "Phase 5",
    title: "Production",
    status: "upcoming",
    items: ["Error Handling", "Performance Optimization", "Full Test Suite", "Web Deployment"],
  },
];

const STATUS_ICONS: Record<string, React.ReactNode> = {
  complete: <CheckCircle2 size={14} className="text-green-400" />,
  "in-progress": <Clock size={14} className="text-neon-blue" />,
  upcoming: <Circle size={14} className="text-white/20" />,
};

const STATUS_LABELS: Record<string, string> = {
  complete: "Complete",
  "in-progress": "In Progress",
  upcoming: "Upcoming",
};

const HACKATHON_STATS = [
  { label: "Days to Build", value: "30", icon: "📅" },
  { label: "Lines of C++", value: "5,000+", icon: "💻" },
  { label: "Features Supported", value: "25+", icon: "⚡" },
  { label: "Test Cases", value: "200+", icon: "✅" },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-24">

        {/* Hero */}
        <motion.section {...fadeUp()} className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-neon-blue/20 text-neon-blue text-xs font-medium mb-6">
            <Zap size={12} />
            Hackathon Project 2025
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              JSForge
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            JSForge Runtime is an educational JavaScript interpreter written entirely in C++.
            Built for a hackathon, it showcases how modern scripting languages work under the hood —
            from raw source text to execution, one token at a time.
          </p>
        </motion.section>

        {/* Hackathon Stats */}
        <motion.section {...fadeUp(0.1)}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HACKATHON_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass border border-white/10 rounded-2xl p-5 text-center hover:border-neon-blue/20 transition-colors"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Project Goals */}
        <motion.section {...fadeUp(0.1)}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center">
              <Target size={16} className="text-neon-blue" />
            </div>
            <h2 className="text-2xl font-bold text-white">Project Goals</h2>
          </div>
          <div className="glass border border-white/10 rounded-2xl p-6 grid md:grid-cols-2 gap-3">
            {GOALS.map((goal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 text-sm text-white/70"
              >
                <CheckCircle2 size={15} className="text-neon-blue flex-shrink-0 mt-0.5" />
                {goal}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Roadmap */}
        <motion.section {...fadeUp(0.1)}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
              <Map size={16} className="text-neon-purple" />
            </div>
            <h2 className="text-2xl font-bold text-white">Roadmap</h2>
          </div>
          <div className="space-y-4">
            {ROADMAP.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass border rounded-2xl p-5 transition-colors ${
                  phase.status === "complete"
                    ? "border-green-500/20"
                    : phase.status === "in-progress"
                    ? "border-neon-blue/30"
                    : "border-white/8"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs text-white/30 font-mono">{phase.phase}</span>
                    <h3 className="text-base font-semibold text-white">{phase.title}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass border border-white/10 text-xs text-white/50">
                    {STATUS_ICONS[phase.status]}
                    {STATUS_LABELS[phase.status]}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {phase.items.map((item) => (
                    <div
                      key={item}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border text-center ${
                        phase.status === "complete"
                          ? "border-green-500/20 text-green-400/70 bg-green-500/5"
                          : phase.status === "in-progress"
                          ? "border-neon-blue/20 text-neon-blue/70 bg-neon-blue/5"
                          : "border-white/8 text-white/30"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section {...fadeUp(0.1)}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center">
              <Users size={16} className="text-neon-blue" />
            </div>
            <h2 className="text-2xl font-bold text-white">The Team</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass border border-white/10 rounded-2xl p-6 hover:border-neon-blue/20 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{member.name}</h3>
                    <p className="text-xs text-neon-blue mb-2">{member.role}</p>
                    <p className="text-sm text-white/50 leading-relaxed">{member.bio}</p>
                    <div className="flex gap-2 mt-4">
                      <a href={member.github} className="p-1.5 rounded-lg glass border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all">
                        <Github size={14} />
                      </a>
                      <a href={member.twitter} className="p-1.5 rounded-lg glass border border-white/10 text-white/40 hover:text-neon-blue hover:border-neon-blue/30 transition-all">
                        <Twitter size={14} />
                      </a>
                      <a href={member.linkedin} className="p-1.5 rounded-lg glass border border-white/10 text-white/40 hover:text-neon-blue hover:border-neon-blue/30 transition-all">
                        <Linkedin size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section {...fadeUp(0.1)}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
              <Code2 size={16} className="text-neon-purple" />
            </div>
            <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
          </div>
          <div className="glass border border-white/10 rounded-2xl p-6">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  category: "Runtime (C++)",
                  color: "text-orange-400",
                  items: ["C++17", "STL Containers", "Smart Pointers", "Recursive Descent Parser", "Tree-Walk Interpreter"],
                },
                {
                  category: "Frontend",
                  color: "text-neon-blue",
                  items: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Monaco Editor", "ShadCN UI"],
                },
                {
                  category: "Backend & AI",
                  color: "text-neon-purple",
                  items: ["Node.js + Express", "Prisma + PostgreSQL", "Clerk Auth", "OpenAI SDK", "Railway + Vercel"],
                },
              ].map((stack) => (
                <div key={stack.category}>
                  <h4 className={`text-sm font-semibold mb-3 ${stack.color}`}>{stack.category}</h4>
                  <ul className="space-y-1.5">
                    {stack.items.map((item) => (
                      <li key={item} className="text-sm text-white/50 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Hackathon CTA */}
        <motion.section {...fadeUp(0.1)} className="text-center">
          <div className="glass border border-neon-blue/20 rounded-3xl p-10">
            <div className="text-4xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-white mb-3">Built for the Hackathon</h2>
            <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed mb-6">
              JSForge Runtime was built in 30 days as a hackathon project. Every line of C++ —
              from the first token to the final evaluated expression — was written from scratch to
              demonstrate how real JavaScript engines work.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="/playground"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Try the Runtime
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl glass border border-white/20 text-white/70 hover:text-white text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <Github size={15} />
                View Source
              </a>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
