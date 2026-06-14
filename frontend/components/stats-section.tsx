"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Gauge, ListChecks, FlaskConical } from "lucide-react";

const STATS = [
  {
    icon: Gauge,
    value: 0.4,
    suffix: "ms",
    decimals: 1,
    label: "Average Execution Time",
  },
  {
    icon: ListChecks,
    value: 24,
    suffix: "+",
    decimals: 0,
    label: "Supported Language Features",
  },
  {
    icon: FlaskConical,
    value: 312,
    suffix: "",
    decimals: 0,
    label: "Test Cases Passed",
  },
];

function Counter({
  value,
  decimals,
  suffix,
}: {
  value: number;
  decimals: number;
  suffix: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative border-y border-border bg-surface/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 text-neon-cyan">
                <stat.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="mt-4 font-display text-4xl font-bold text-gradient sm:text-5xl">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
