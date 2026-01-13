import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "leaf-fall-slow-1": {
          "0%": { transform: "translate3d(0, -10px, 0)", opacity: "0" },
          "10%": { opacity: "0.7" },
          "100%": { transform: "translate3d(30px, 100vh, 0)", opacity: "0.5" },
        },
        "leaf-fall-slow-2": {
          "0%": { transform: "translate3d(0, -10px, 0)", opacity: "0" },
          "10%": { opacity: "0.65" },
          "100%": { transform: "translate3d(-25px, 100vh, 0)", opacity: "0.45" },
        },
        "leaf-fall-slow-3": {
          "0%": { transform: "translate3d(0, -10px, 0)", opacity: "0" },
          "10%": { opacity: "0.7" },
          "100%": { transform: "translate3d(20px, 100vh, 0)", opacity: "0.5" },
        },
        "leaf-fall-medium-1": {
          "0%": { transform: "translate3d(0, -10px, 0)", opacity: "0" },
          "10%": { opacity: "0.65" },
          "100%": { transform: "translate3d(-35px, 100vh, 0)", opacity: "0.45" },
        },
        "leaf-fall-medium-2": {
          "0%": { transform: "translate3d(0, -10px, 0)", opacity: "0" },
          "10%": { opacity: "0.7" },
          "100%": { transform: "translate3d(40px, 100vh, 0)", opacity: "0.5" },
        },
        "leaf-fall-fast-1": {
          "0%": { transform: "translate3d(0, -10px, 0)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "100%": { transform: "translate3d(25px, 100vh, 0)", opacity: "0.4" },
        },
        "leaf-fall-fast-2": {
          "0%": { transform: "translate3d(0, -10px, 0)", opacity: "0" },
          "10%": { opacity: "0.65" },
          "100%": { transform: "translate3d(-30px, 100vh, 0)", opacity: "0.45" },
        },
        "leaf-spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "leaf-spin-reverse-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "leaf-fall-slow-1": "leaf-fall-slow-1 20s linear infinite",
        "leaf-fall-slow-2": "leaf-fall-slow-2 22s linear infinite",
        "leaf-fall-slow-3": "leaf-fall-slow-3 21s linear infinite",
        "leaf-fall-medium-1": "leaf-fall-medium-1 15s linear infinite",
        "leaf-fall-medium-2": "leaf-fall-medium-2 16s linear infinite",
        "leaf-fall-fast-1": "leaf-fall-fast-1 11s linear infinite",
        "leaf-fall-fast-2": "leaf-fall-fast-2 10s linear infinite",
        "leaf-spin-slow": "leaf-spin-slow 18s linear infinite",
        "leaf-spin-reverse-slow": "leaf-spin-reverse-slow 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
