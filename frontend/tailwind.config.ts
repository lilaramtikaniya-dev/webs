import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        background: "#05060A",
        surface: "#0B0E16",
        "surface-2": "#10141F",
        border: "rgba(255,255,255,0.08)",

        // Brand accents
        "neon-blue": "#3B82F6",
        "neon-cyan": "#22D3EE",
        "neon-purple": "#A855F7",
        "neon-violet": "#7C3AED",

        // Text
        "text-primary": "#E6E9F2",
        "text-muted": "#8B92A8",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "glow-blue-purple":
          "radial-gradient(60% 60% at 50% 0%, rgba(59,130,246,0.25) 0%, rgba(168,85,247,0.12) 45%, transparent 80%)",
        "hero-gradient":
          "linear-gradient(135deg, #3B82F6 0%, #7C3AED 50%, #A855F7 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(59,130,246,0.25)",
        "glow-purple": "0 0 40px rgba(168,85,247,0.25)",
        "inner-glass": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      backdropBlur: {
        glass: "16px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
