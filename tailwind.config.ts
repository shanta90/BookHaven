import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        bookhaven: {
          // ── Brand colours ─────────────────────────────
          "primary":         "#4f46e5",   // deep indigo
          "primary-content": "#ffffff",

          "secondary":         "#0d9488", // teal
          "secondary-content": "#ffffff",

          "accent":         "#f59e0b",    // amber
          "accent-content": "#1a1a1a",    // dark text on amber

          // ── Neutral / base ────────────────────────────
          "neutral":         "#1e1e2e",
          "neutral-content": "#e2e8f0",

          "base-100": "#ffffff",
          "base-200": "#f4f4f8",
          "base-300": "#e5e7eb",
          "base-content": "#1a1a2e",

          // ── Semantic ──────────────────────────────────
          "info":    "#3b82f6",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error":   "#ef4444",

          // ── Radius / border ───────────────────────────
          "--rounded-btn":  "0.75rem",
          "--rounded-box":  "1.5rem",
          "--rounded-badge":"1rem",
          "--tab-radius":   "0.5rem",
        },
      },
    ],
  },
};
export default config;
