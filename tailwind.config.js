/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },

  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        '.button-green': {
          '@apply focus:outline-none sm:text-sm text-white ml-2 bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-600 rounded text-xs px-1 py-0.5 mb-1': {},
        },
        '.button-yellow': {
          '@apply focus:outline-none sm:text-sm text-white ml-2 bg-yellow-500 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 rounded text-xs px-1 py-0.5 mb-1': {}
        },
        '.button-red': {
          '@apply focus:outline-none sm:text-sm text-white ml-2 bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 rounded text-xs px-1 py-0.5 mr-2 mb-1': {}
        },
        '.button-white': {
          '@apply sm:px-5 sm:text-sm md:px-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded text-xs px-1 py-0.5 mr-2 mb-1': {}
        },
        '.button-purple': {
          '@apply w-3/12 sm:w-2/12 sm:text-sm focus:outline-none text-white ml-2 bg-purple-700 hover:bg-purple-800 focus:ring-2 focus:ring-purple-300 rounded text-xs px-1 py-0.5 mb-1': {}
        },
        '.button-gray': {
          '@apply w-3/12 sm:w-2/12 sm:text-sm focus:outline-none text-white ml-2 bg-gray-800 hover:bg-gray-900 focus:ring-2 focus:ring-gray-300 rounded text-xs px-1 py-0.5 mb-1': {}
        },
      });
    },

  ],
}
