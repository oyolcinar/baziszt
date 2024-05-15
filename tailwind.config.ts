import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      cursor: {
        zoomInCustom: 'url(/Cursors/zoomin1.png), auto',
        dragCustom: 'url(/Cursors/drag1.png), auto',
      },
      screens: {
        customMd: '1450px',
      },
      colors: {
        sandColor: '#6A6B44',
        bordeux: '#370008',
        lightBlue: '#6BA0DC',
        pinkish: '#6F8D1D4',
        bone: '#F8F4EC',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        futura: ['futura-pt'],
        quasimoda: ['quasimoda'],
        altesse24: ['altesse-std-24pt'],
        altesse64: ['altesse-std-64pt'],
      },
    },
  },
  plugins: [],
};
export default config;
