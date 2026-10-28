import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E1440',        // night indigo, text + footer
        indigo: '#1C2674',     // adire dye
        hibiscus: '#D93A52',   // zobo red, the one warm accent
        cotton: '#F3F5FA',     // undyed cotton, page background
        mist: '#E2E7F5',       // pale dye wash
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: { soft: '0 20px 50px -20px rgba(14,20,64,.25)' },
    },
  },
  plugins: [],
};
export default config;
