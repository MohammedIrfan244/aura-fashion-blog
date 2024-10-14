/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        snowWhite:'#FFFAFA',
        richBlack:'#1C1C1C'
      },
      keyframes:{
        bounce:{
          '0%':{height:'0'},
          '40%':{height:'70px'},
          '80%':{height:'65px'},
          '100%':{height:'80px'}
        }
      },
      animation:{
        'bouncing':'bounce 0.5s ease-out forwards'
      }
    },
  },
  plugins: [],
}