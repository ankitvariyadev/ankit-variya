/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          '100': 'rgba(255, 255, 255, 0.1)',
          '200': 'rgba(255, 255, 255, 0.15)',
          '300': 'rgba(255, 255, 255, 0.2)',
          '400': 'rgba(255, 255, 255, 0.25)',
          '500': 'rgba(255, 255, 255, 0.3)',
        },
        border: {
          glass: 'rgba(255, 255, 255, 0.18)',
        },
        shadow: {
          glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        },
      },
      blur: {
        xs: '2px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
    },
  },
  plugins: [],
};