/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF6B00',
          dark: '#CC4E00',
          light: '#FF8C3A',
          subtle: '#FFF0E5',
        },
        secondary: {
          DEFAULT: '#0B0A0A',
          mid: '#2D2D2D',
          light: '#5A5A5A',
          muted: '#9A9A9A',
        },
        gold: {
          DEFAULT: '#C9A84C',
          dark: '#8B6914',
          light: '#E8C96A',
          subtle: '#FAF3DC',
        },
        neutral: {
          DEFAULT: '#FAF6EF',
          mid: '#EDE8DF',
          dark: '#C8C0B0',
          deep: '#3D3830',
        },
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}