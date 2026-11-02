/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#152225',
        muted: '#5e6978',
        bambiBlue: '#2255ee',
        bambiTeal: '#007e75',
        bambiLine: '#e2e6ef',
        bambiPaper: '#f8f9fd',
        bambiLime: '#e6fb8b',
        bambiLilac: '#dcd1ff',
        bambiCoral: '#ff8c74',
        bambiWarm: '#fff9f0',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.22)', opacity: '1' },
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        breathe: 'breathe 8s ease-in-out infinite',
        float: 'gentleFloat 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
