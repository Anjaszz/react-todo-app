/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        signikaNegative: ['Signika Negative', 'sans-serif'],
      },
      colors: {
        customRed: '#A02334',
        myblue: '#B4D6CD',
        blue2:'#96C9F4',
      },
    },
  },
  plugins: [],
}

