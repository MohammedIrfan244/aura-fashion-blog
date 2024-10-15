/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        agdasima: ['Agdasima', 'sans-serif'],
        londrina: ['Londrina Sketch', 'cursive'],
        sixtyfour: ['Sixtyfour Convergence', 'sans-serif'],
      },
      colors: {
        snowWhite: '#FFFAFA',
        richBlack: '#000000',
        lavendarBlush: '#FFF0F5',
      },
      keyframes: {
        bounce: {
          '0%': { height: '0' },
          '40%': { height: '70px' },
          '80%': { height: '65px' },
          '100%': { height: '80px' },
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(15px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        bouncing: 'bounce 0.7s ease-out forwards',
        slideUp: 'slideUp 0.6s ease-out forwards',
        slideLeft: 'slideLeft 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
