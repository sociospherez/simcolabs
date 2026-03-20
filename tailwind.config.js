/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050b16',
        panel: '#0b1220',
        line: 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(59,130,246,0.18)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top, rgba(38,99,235,0.22), transparent 35%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.14), transparent 28%), radial-gradient(circle at 20% 80%, rgba(14,165,233,0.12), transparent 30%)',
      },
    },
  },
  plugins: [
    require('lightswind/plugin'),],
};
