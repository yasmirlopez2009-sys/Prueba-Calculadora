/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        surface: '#1e293b',
        foreground: '#f8fafc',
        secondary: '#64748b',
        accent: '#3b82f6',
        error: '#ef4444',
        operator: '#f59e0b',
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
      },
      borderRadius: {
        'xl': '12px',
      },
    },
  },
  plugins: [],
}
