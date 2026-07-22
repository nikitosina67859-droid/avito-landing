import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: { black: "#050505", graphite: "#111111" },
        brand: { red: "#E10600", darkred: "#760000" },
        ink: { white: "#FFFFFF", gray: "#B8B8B8" },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "glow-red": "0 0 40px -10px rgba(225,6,0,0.55)",
        "glow-red-lg": "0 20px 60px -15px rgba(225,6,0,0.45)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(184,184,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184,184,184,0.06) 1px, transparent 1px)",
      },
      backgroundSize: { grid: "44px 44px" },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(3deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        floatSlow: "floatSlow 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
