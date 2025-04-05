import type { Rule } from "unocss";
import {
  defineConfig,
  presetWind3,
  presetAttributify,
  transformerVariantGroup,
  transformerDirectives,
} from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
  presets: [
    presetRemToPx({
      baseFontSize: 8,
    }),
    presetWind3(),
    presetAttributify(),
  ],
  shortcuts: {
    "extend-click":
      "relative before:content-empty before:absolute before:-inset-10px",
  },
  theme: {
    colors: {
      "bg-primary": "#222",
      "bg-d": "rgba(0, 0, 0, 0.3)",
      "highlight-bg": "#333",
      "dialog-bg": "#666",
      theme: "#ffcd32",
      "theme-d": "rgba(255, 205, 49, 0.5)",
      "sub-theme": "#d93f30",
      "text-primary": "#fff",
      "text-d": "rgba(255, 255, 255, 0.3)",
      "text-l": "rgba(255, 255, 255, 0.5)",
      "text-ll": "rgba(255, 255, 255, 0.8)",
    },
  },
  rules: [
    [
      /^bg-image-(.*)$/,
      ([, url]) => ({
        "background-size": "100% 100%",
        "background-image": `url(${url}@2x.png)`,
        "@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)": `{
          background-image: url(${url}@3x.png);
        }`,
      }),
    ] as Rule,
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
