module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './src/components/**/*.{js,ts,jsx,tsx,html}',
    './src/pages/**/*.tsx',
    './src/components/ui/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Enable purge for production build to avoid unused CSS
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{js,jsx,ts,tsx,html}',
      './src/components/**/*.{js,jsx,ts,tsx,html}',
      './src/pages/**/*.tsx',
      './src/components/ui/**/*.tsx',
    ],
  },
};
