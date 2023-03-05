import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import a11yEmoji from '@fec/remark-a11y-emoji';

import mdx from "@astrojs/mdx";
import {remarkReadingTime} from "./plugins/markdown/readingTime.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), svelte(), mdx({
    rehypePlugins: [
      a11yEmoji,
    ],
    remarkPlugins: [
      remarkReadingTime
    ],
  })],
  markdown: {
    rehypePlugins: [
      a11yEmoji,
    ],
    remarkPlugins: [
      remarkReadingTime
    ],
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
    extendDefaultPlugins: true
  },
  site: 'https://regibyte.github.io',
});