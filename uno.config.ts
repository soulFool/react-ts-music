import { defineConfig, presetWind3, presetAttributify, transformerVariantGroup, transformerDirectives } from "unocss"
import presetRemToPx from "@unocss/preset-rem-to-px"

export default defineConfig({
  presets: [
    presetRemToPx({
      baseFontSize: 4
    }),
    presetWind3(),
    presetAttributify()
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()]
})
