/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Liebling', 'Assistant', 'Heebo', 'sans-serif'],
        liebling: ['Liebling', 'Assistant', 'sans-serif'],
      },
      colors: {
        union: {
          bg: '#F7F9FC',
          card: '#FFFFFF',
          primary: '#4F46E5',
          'primary-dark': '#3730A3',
          'primary-light': '#E0E7FF',
          'primary-50': '#EEF2FF',
          accent: '#8B5CF6',
          'accent-dark': '#6D28D9',
          'accent-light': '#EDE9FE',
          success: '#10B981',
          'success-dark': '#059669',
          'success-light': '#D1FAE5',
          danger: '#EF4444',
          'danger-dark': '#DC2626',
          'danger-light': '#FEE2E2',
          warning: '#F59E0B',
          'warning-dark': '#D97706',
          'warning-light': '#FEF3C7',
          text: '#1E293B',
          'text-secondary': '#475569',
          'text-muted': '#94A3B8',
          subtext: '#64748B',
          border: '#E2E8F0',
          divider: '#F1F5F9',
          // Legacy alias
          primaryDark: '#3730A3',
        },
        community: {
          primary: '#ff5e00',
          bg: '#f8f6f5',
          dark: '#23160f',
        },
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 4px 20px 0px rgba(79, 70, 229, 0.3)',
        'community-glow': '0 4px 20px 0px rgba(255, 94, 0, 0.3)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}