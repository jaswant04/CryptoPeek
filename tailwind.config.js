/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth:{
        '2':'0.5px',
      },
      margin:{
        '1':'1px'
      },
      screens:{
        'xxs':'375px'
      }
    },
  },
  plugins: [],
}

