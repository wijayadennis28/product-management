module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // Ensure unused CSS is purged in production
  darkMode: false, // You can set it to 'media' or 'class' if you want dark mode support
  theme: {
    extend: {}, // You can extend the default Tailwind theme here if needed
  },
  variants: {
    extend: {}, // Extend variants for specific utilities
  },
  plugins: [],
};
