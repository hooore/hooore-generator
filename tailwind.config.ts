import componentV1ConfigPreset from "@hooore/components/tailwind.config";
import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const preset: Omit<Config, "content"> = {
  plugins: [tailwindAnimate],
};

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  prefix: "ss-",
  presets: [preset, componentV1ConfigPreset],
} satisfies Config;
