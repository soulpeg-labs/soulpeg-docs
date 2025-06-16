import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "soulpeg-dark": "#0D1117", // A very dark, slightly blueish charcoal
        "soulpeg-darker": "#010409", // Even darker for elements like code blocks
        "soulpeg-light": "#E6EDF3", // Light gray for text
        "soulpeg-gray": "#7D8590", // Medium gray for secondary text
        "soulpeg-border": "#21262D", // Border color
        "soulpeg-accent-blue": "#3B82F6", // Vibrant blue from your site
        "soulpeg-accent-purple": "#8B5CF6", // Vibrant purple from your site
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.soulpeg-light"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-lead": theme("colors.soulpeg-gray"),
            "--tw-prose-links": theme("colors.soulpeg-accent-blue"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.soulpeg-gray"),
            "--tw-prose-bullets": theme("colors.soulpeg-accent-blue"),
            "--tw-prose-hr": theme("colors.soulpeg-border"),
            "--tw-prose-quotes": theme("colors.soulpeg-light"),
            "--tw-prose-quote-borders": theme("colors.soulpeg-accent-purple"),
            "--tw-prose-captions": theme("colors.soulpeg-gray"),
            "--tw-prose-code": theme("colors.soulpeg-light"),
            "--tw-prose-pre-code": theme("colors.soulpeg-light"),
            "--tw-prose-pre-bg": theme("colors.soulpeg-darker"),
            "--tw-prose-th-borders": theme("colors.soulpeg-border"),
            "--tw-prose-td-borders": theme("colors.soulpeg-border"),
            "--tw-prose-invert-body": theme("colors.soulpeg-light"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.soulpeg-gray"),
            "--tw-prose-invert-links": theme("colors.soulpeg-accent-blue"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.soulpeg-gray"),
            "--tw-prose-invert-bullets": theme("colors.soulpeg-accent-blue"),
            "--tw-prose-invert-hr": theme("colors.soulpeg-border"),
            "--tw-prose-invert-quotes": theme("colors.soulpeg-light"),
            "--tw-prose-invert-quote-borders": theme("colors.soulpeg-accent-purple"),
            "--tw-prose-invert-captions": theme("colors.soulpeg-gray"),
            "--tw-prose-invert-code": theme("colors.soulpeg-light"),
            "--tw-prose-invert-pre-code": theme("colors.soulpeg-light"),
            "--tw-prose-invert-pre-bg": theme("colors.soulpeg-darker"),
            "--tw-prose-invert-th-borders": theme("colors.soulpeg-border"),
            "--tw-prose-invert-td-borders": theme("colors.soulpeg-border"),
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config
