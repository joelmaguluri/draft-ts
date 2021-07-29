const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge:{ 
    content:['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: [
      'color-2',
      'color-3',
      'color-4',
      'color-5',
      'color-9',
      'color-10',
      'color-12',
    ]
},
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
      },
      flex: {
        10: '1 0 10%',
      },
      colors: {
        'interaction-0': {
          DEFAULT: '#526EFF',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#EBEEFF',
          300: '#B8C3FF',
          400: '#8599FF',
          500: '#526EFF',
          600: '#1F43FF',
          700: '#0026EB',
          800: '#001EB8',
          900: '#001685',
        },
        'interaction-1': {
          DEFAULT: '#3652E3',
          50: '#FFFFFF',
          100: '#E9ECFC',
          200: '#BCC6F6',
          300: '#909FEF',
          400: '#6379E9',
          500: '#3652E3',
          600: '#1C38CA',
          700: '#162C9D',
          800: '#101F70',
          900: '#091344',
        },
        'interaction-2': {
          DEFAULT: '#233FD1',
          50: '#E0E4FA',
          100: '#CAD1F6',
          200: '#9EABEF',
          300: '#7385E7',
          400: '#4760E0',
          500: '#233FD1',
          600: '#1C32A5',
          700: '#14257A',
          800: '#0D174E',
          900: '#060A22',
        },
        'interaction+2': {
          DEFAULT: '#7087FF',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#D6DDFF',
          400: '#A3B2FF',
          500: '#7087FF',
          600: '#3D5CFF',
          700: '#0A31FF',
          800: '#0022D6',
          900: '#001AA3',
        },
        'interaction+3': {
          DEFAULT: '#E3DAF9',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#E3DAF9',
          600: '#C2AEF2',
          700: '#A182EB',
          800: '#7F56E4',
          900: '#5E2ADD',
        },
        red: {
          DEFAULT: '#FF3507',
          50: '#FFF0ED',
          100: '#FFDBD3',
          200: '#FFB2A0',
          300: '#FF886D',
          400: '#FF5F3A',
          500: '#FF3507',
          600: '#D32700',
          700: '#A01E00',
          800: '#6D1400',
          900: '#3A0B00',
        },
        green: {
          DEFAULT: '#38CB89',
          50: '#EEFBF5',
          100: '#DAF5E9',
          200: '#B1EBD1',
          300: '#89E0B9',
          400: '#60D6A1',
          500: '#38CB89',
          600: '#2BA56E',
          700: '#217C53',
          800: '#165438',
          900: '#0B2C1D',
        },
        header: {
          DEFAULT: '#131528',
          50: '#6970B8',
          100: '#5860AF',
          200: '#444B90',
          300: '#34396D',
          400: '#23274B',
          500: '#131528',
          600: '#030305',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        'low-contrast-1': { DEFAULT: '#F5F6FC' },
        'low-contrast-2': {
          DEFAULT: '#DDDDE3',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#F9F9FA',
          500: '#DDDDE3',
          600: '#C1C1CC',
          700: '#A5A5B5',
          800: '#89899E',
          900: '#6E6E86',
        },
        'low-contrast-3': { DEFAULT: '#DFE5EC' },
        'main-text': { DEFAULT: '#222446' },
        'description-text': { DEFAULT: '#636673' },
        overlay: { DEFAULT: '#44464F' },
        'high-contrast-3': { DEFAULT: '#99A2AB' },
        'high-contrast-2':{DEFAULT:'#C8D3DF'},
        background: { DEFAULT: '#E5E5E5' },
        menu: { DEFAULT: ' #656875' },
        'sub-menu': { DEFAULT: '#F0F1F7' },
        charts: {
          'color-1': {
            DEFAULT: '#F19176',
            50: '#FFFFFF',
            100: '#FFFFFF',
            200: '#FFFFFF',
            300: '#FADBD3',
            400: '#F6B6A4',
            500: '#F19176',
            600: '#EC6C48',
            700: '#E84719',
            800: '#BB3813',
            900: '#8D2A0E',
          },
          'color-2': {
            DEFAULT: '#3652E3',
          },
          'color-3': {
            DEFAULT: '#526EFF',
          },
          'color-4': {
            DEFAULT: '#7087FF',
          },
          'color-5': {
            DEFAULT: '#8285D4',
          },
          'color-9': {
            DEFAULT: '#FFF4A8',
          },
          'color-10': {
            DEFAULT: '#9CD8C8',
          },
          'color-12': {
            DEFAULT: ' #468FE5',
          },
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'error-fade-in-up': 'fade-in-up 0.2s ease-out',
      },
      textColor: ['input-field-focus'],
    },
  },
  variants: {
    extend: {},
  },
  
  plugins: [],
}
