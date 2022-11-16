import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, transformerAttributifyJsx
} from 'unocss'

export default defineConfig({
  theme: {
  },
  shortcuts: {
  },
  safelist: [],
  preflights: [
    {
      layer: 'components',
      getCSS: () => `
        .j-icon{
          fill: currentColor;
          width: 1.2em;
          height: 1.2em;
        }
      `
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx()
  ],
})
