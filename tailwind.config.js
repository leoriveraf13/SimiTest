const deafultTheme = require('tailwindcss/defaultConfig');

module.exports = {
  content: [
    './src/pages/**/*.{html,js,ts,jsx,tsx}', 
    './lib/components/**/*.{html,js,ts,jsx,tsx}'
  ],
  important: true,
  theme: {
    ...deafultTheme,
    colors: {
      ...deafultTheme.colors,
      primary: '',
      white: '#FFFFFF',
      red: '#FF0000',
      blue: '#0798e8',
      grey: '#6C7281',
      text: {
        DEFAULT: '#1F2937',
        light: '#FFFFFF',
        grey: '#6C7281'
      },
      light: {
        DEFAULT: '#FAFBFC',
        light: '#F3F4F6'
      }
    },
    extend: {},
  },
  plugins: [],
}
