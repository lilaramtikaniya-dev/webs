"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group glass relative rounded-xl2 p-6 transition-all duration-300 hover:border-neon-blue/40 hover:shadow-glow"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 text-neon-cyan transition-colors group-hover:from-neon-blue/30 group-hover:to-neon-purple/30">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-text-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        {description}
      </p>
    </motion.div>
  );
}
