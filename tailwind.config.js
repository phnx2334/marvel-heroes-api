const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
        lobster: ["lobster", "sans-serif"],
        marvel: ["marvel", "sans-serif"],
        permanent: ["Permanent Marker", "sans-serif"],
        teko: ["teko", "sans-serif"],
        Bungee: ["Bungee Inline", "sans-serif"],

        sans: ["marvel", ...defaultTheme.fontFamily.sans],
      },
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
