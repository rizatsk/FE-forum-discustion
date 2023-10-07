/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "16px 0",
    },
    extend: {
      colors: {
        "form-error": "#ff0062",
        "text-primary": "#111827",
        primary: "#0284c7",
        "primary-hover": "#0369a1",
        "dark-primary": "#334155",
        "dark-primary-2": "#475569",
        "dark-primary-sky": "#67e8f9",
      },
      boxShadow: {
        primaryShadow: "0px -1px 14px 2px rgba(176,176,176,1)",
        darkPrimaryShadow: "-1px 1px 14px 6px rgba(103,232,249,1)",
      },
    },
  },
  plugins: [],
};
