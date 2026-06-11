import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system: deep space palette
        void: {
          950: "#080a0f",
          900: "#0d1017",
          800: "#141820",
          700: "#1c2230",
          600: "#232b3d",
          500: "#2d374d",
        },
        iris: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          300: "#c4b5fd",
          200: "#ddd6fe",
          glow: "rgba(139, 92, 246, 0.15)",
        },
        nova: {
          400: "#38bdf8",
          500: "#0ea5e9",
          glow: "rgba(56, 189, 248, 0.12)",
        },
        jade: {
          400: "#34d399",
          500: "#10b981",
          glow: "rgba(52, 211, 153, 0.12)",
        },
        ember: {
          400: "#fb923c",
          500: "#f97316",
          glow: "rgba(251, 146, 60, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grid-void":
          "radial-gradient(ellipse at top, #141820 0%, #080a0f 70%)",
        "glow-iris":
          "radial-gradient(circle at center, rgba(139,92,246,0.08) 0%, transparent 70%)",
        "glow-nova":
          "radial-gradient(circle at center, rgba(56,189,248,0.08) 0%, transparent 70%)",
        "glow-jade":
          "radial-gradient(circle at center, rgba(52,211,153,0.08) 0%, transparent 70%)",
        "glow-ember":
          "radial-gradient(circle at center, rgba(251,146,60,0.08) 0%, transparent 70%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "orbit-slow": {
          "0%": { transform: "rotate(0deg) translateX(60px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(60px) rotate(-360deg)",
          },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "orbit-slow": "orbit-slow 12s linear infinite",
        "fade-up": "fade-up 0.5s ease forwards",
      },
      boxShadow: {
        "glow-iris": "0 0 40px rgba(139, 92, 246, 0.15)",
        "glow-nova": "0 0 40px rgba(56, 189, 248, 0.12)",
        "glow-jade": "0 0 40px rgba(52, 211, 153, 0.12)",
        "glow-ember": "0 0 40px rgba(251, 146, 60, 0.12)",
        "card-hover": "0 0 0 1px rgba(139, 92, 246, 0.3), 0 8px 32px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
