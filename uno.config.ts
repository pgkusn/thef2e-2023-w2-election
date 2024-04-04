import { defineConfig, presetUno, presetIcons } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  transformers: [transformerVariantGroup(), transformerDirectives()],
  presets: [presetUno(), presetIcons()],
  theme: {
    breakpoints: {
      md: '768px',
      '2xl': '1288px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1rem',
        '2xl': '1rem',
      },
    },
    colors: {
      theme: {
        primary: '#525B76',
        secondary: '#E5E9EC',
        success: '#40C9A7',
        info: '#00BCF5',
        warning: '#FAD961',
        danger: '#E76D83',
        light: '#fff',
        dark: '#222',
      },
      party: {
        1: '#9AE2E9',
        2: '#93E0C0',
        3: '#84AAE2',
      },
    },
  },
  safelist: [
    'bg-party-1',
    'bg-party-2',
    'bg-party-3',
    'before:bg-party-1',
    'before:bg-party-2',
    'before:bg-party-3',
  ],
})
