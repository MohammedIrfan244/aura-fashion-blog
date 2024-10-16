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
        slideX: {
          '0%': { transform: 'translateX(var(--tw-translate-x))', opacity: '0' },
          '70%': { transform: 'translateX(var(--tw-translate-x-70))', opacity: '0.8' },
          '100%':{transform: 'translateX(0)', opacity: '1'}
        },
        slideY:{
          '0%': { transform: 'translateY(var(--tw-translate-y))', opacity: '0' },
          '70%': { transform: 'translateY(var(--tw-translate-y-70))', opacity: '0.8' },
          '100%':{transform: 'translateY(0)', opacity: '1'}
        },
        circGrow:{
          '0%': { transform: 'scale(0.7)',opacity:'0.5' },
          '50%': { transform: 'scale(1.05)' ,opacity:'0.7'},
          '100%': { transform: 'scale(1)',opacity:'1' }
        },
        heightGrow:{
          '0%':{height:"0"},
          '70%':{height:"var(--tw-hieght-70)"},
          '100%':{height:"var(--tw-height-100)"}
        }
      },
      animation: {
        bouncing: 'bounce 0.6s ease-out forwards',
        slideY: 'slideY ease-out forwards',
        slideX: 'slideX ease-out forwards',
        circGrow: 'circGrow ease-out forwards',
        heightGrow:'heightGrow ease-out forwards'
      },
    },
  },
  plugins: [],
};
