/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bone: '#FDFBF7',        // Nền canvas chính (Warm Cream)
          ivory: '#F7F5F0',       // Nền khối lookbook, thẻ (Ivory Silk)
          sand: '#E6E2DD',        // Viền mảnh hairline
          beige: '#D8D2C8',       // Viền nhấn hover
          muted: '#6E6A64',       // Phụ đề, metadata (WCAG AA > 5.1:1 trên canvas)
          charcoal: '#2D2B28',    // Thân bài nội dung đọc
          dark: '#111111',        // Tiêu đề & nút bấm chính
          black: '#000000',       // OLED Black thuần túy cho Slide 0
          gold: '#A68A56',        // Điểm nhấn may đo Atelier
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        anton: ['Anton', 'Impact', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.035em',
        tighter: '-0.025em',
        widest: '0.2em',
        ultra: '0.3em',
      },
      maxWidth: {
        'prose-compact': '60ch',
        'prose-optimal': '75ch',
        'prose-wide': '85ch',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        stampImpact: {
          '0%': { transform: 'scale(1.12)', opacity: '0' },
          '60%': { transform: 'scale(0.98)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee linear infinite',
        stamp: 'stampImpact 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fadeUp: 'fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
