import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#060a12",
        surface: "#0b111c",
        elevated: "#101722",
        paper: "#eee8dc",
        muted: "#9aa4b2",
        copper: "#c76b42",
        "copper-light": "#dc8a60",
        slateblue: "#71849c",
      },
      maxWidth: {
        content: "1280px",
      },
      fontFamily: {
        sans: ["Aptos", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["IBM Plex Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
