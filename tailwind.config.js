/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
          sans: ['Outfit', 'sans-serif'],
          display: ['Syne', 'sans-serif'],
          mono: ['Space Grotesk', 'monospace'],
      },
      colors: {
          lightBg: 'rgb(var(--bg-light-rgb) / <alpha-value>)',
          panelBg: 'rgb(var(--bg-panel-rgb) / <alpha-value>)',
          white: 'rgb(var(--bg-panel-rgb) / <alpha-value>)',
          black: 'rgb(var(--text-dark-rgb) / <alpha-value>)',
          textDark: 'rgb(var(--text-dark-rgb) / <alpha-value>)',
          textMuted: 'rgb(var(--text-muted-rgb) / <alpha-value>)',
          orangeAccent: '#ff5e3a',
          orangeHover: '#e04c2b',
      }
    },
  },
  plugins: [],
}
