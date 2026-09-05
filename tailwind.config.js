/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2C8C4A',
          'green-dark': '#1E6A38',
          'green-deep': '#1B5E32',
          'green-forest': '#1B5E32',
          'green-darker': '#14432A',
          lime: '#8FC96B',
          orange: '#FF9800',
          cream: '#EDE3C7',
          'cream-dark': '#F7F2E3',
          ink: '#0B2B1F',
          muted: '#5A6B5E',
          sage: '#C9CBA3',
          'sage-dark': '#B8B89A',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(44,140,74,0.18)',
        card: '0 12px 40px -16px rgba(11,43,31,0.12)',
        glow: '0 0 0 1px rgba(44,140,74,0.25), 0 20px 50px -20px rgba(44,140,74,0.35)',
        dark: '0 20px 60px -20px rgba(11,43,31,0.5)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
};
