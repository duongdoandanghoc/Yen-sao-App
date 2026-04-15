import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FDF8F0",
          100: "#FAF0DC",
          200: "#F5E0B8",
          300: "#EBC888",
          400: "#D4B06A",
          500: "#C5A059",
          600: "#A88542",
          700: "#8B6B30",
          800: "#6E5225",
          900: "#5A431D",
        },
        brown: {
          50: "#FAF7F2",
          100: "#F0E9DE",
          200: "#E0D2BF",
          300: "#C7B193",
          400: "#A8906B",
          500: "#8B7555",
          600: "#6B5D4A",
          700: "#53473A",
          800: "#3B3418",
          900: "#2A2310",
        },
        cream: {
          50: "#FEFCF9",
          100: "#FAF7F2",
          200: "#F5EFE6",
          300: "#EDE4D6",
          400: "#E0D2BF",
        },
        success: {
          50: "#ECFDF5",
          500: "#2D9F5D",
          600: "#059669",
        },
        error: {
          50: "#FEF2F2",
          500: "#D94949",
          600: "#DC2626",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "warm-sm": "0 1px 3px 0 rgba(59, 52, 24, 0.06), 0 1px 2px 0 rgba(59, 52, 24, 0.04)",
        "warm-md": "0 4px 6px -1px rgba(59, 52, 24, 0.08), 0 2px 4px -1px rgba(59, 52, 24, 0.04)",
        "warm-lg": "0 10px 15px -3px rgba(59, 52, 24, 0.08), 0 4px 6px -2px rgba(59, 52, 24, 0.04)",
        "warm-xl": "0 20px 25px -5px rgba(59, 52, 24, 0.1), 0 10px 10px -5px rgba(59, 52, 24, 0.04)",
        "gold-glow": "0 0 20px rgba(197, 160, 89, 0.3)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C5A059 0%, #D4B978 50%, #C5A059 100%)",
        "hero-gradient": "linear-gradient(180deg, rgba(250, 247, 242, 0) 0%, rgba(250, 247, 242, 1) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
