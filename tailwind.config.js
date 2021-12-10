const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        marvel: ["marvel", "sans-serif"],
        permanent: ["Permanent Marker", "sans-serif"],
        teko: ["teko", "sans-serif"],
        sans: ["marvel", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        loadingPulse: "loadingPulse 2s ease-in-out infinite",
      },
      keyframes: () => ({
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        loadingPulse: {
          "0%,100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(0.9)", opacity: ".5" },
        },
      }),
    },
  },
  variants: {
    extend: {
      screens: {
        sm: { min: "320px", max: "767px" },
        md: { min: "768px", max: "1023px" },
        lg: { min: "1024px", max: "1279px" },
        xl: { min: "1280px", max: "1535px" },
        "2xl": { min: "1536px" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
