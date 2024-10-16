/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        beban: ['Bebas Neue', 'cursive'],
        agdasima: ['Agdasima', 'sans-serif'],
        londrina: ['Londrina Sketch', 'cursive'],
        sixtyfour: ['Sixtyfour Convergence', 'sans-serif'],
      },
      colors: {
        powderBlue: '#B0E0E6',
        softLavender: '#FFE4E1', 
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
        slideDown:{
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '70%': { transform: 'translateY(20px)', opacity: '1.2' },
          '100%':{transform: 'translateY(0)', opacity: '1'}
        },
        circGrow:{
          '0%': { transform: 'scale(0.7)',opacity:'0.5' },
          '50%': { transform: 'scale(1.2)' ,opacity:'0.7'},
          '100%': { transform: 'scale(1)',opacity:'1' }
        }
      },
      animation: {
        bouncing: 'bounce 0.6s ease-out forwards',
        slideUp: 'slideUp ease-out forwards',
        slideLeft: 'slideLeft 0.5s ease-out forwards',
        circGrow: 'circGrow 1s ease-out forwards',
        slideDown:'slideDown 0.6s ease-out forwards'
      },
    },
  },
  plugins: [],
};
