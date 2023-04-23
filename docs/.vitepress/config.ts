import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { visualizer } from 'rollup-plugin-visualizer'
import nav from './configs/nav'
import sidebar from './configs/sidebar'

export default defineConfig({
  title: 'Vue3-basics',
  description: '学习 Vue3 以及配合 vite 搭建项目的相关知识',
  base: process.env.BASE || '/',
  markdown: {
    headers: {
      level: [0, 0],
    },
    lineNumbers: true,
  },
  themeConfig: {
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    logo: '/logo.svg',

    search: {
      provider: 'local',
    },
    // nav
    nav,

    // sidebar
    sidebar,
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present n0liu',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/n0liu' },
    ],
    editLink: {
      pattern: 'https://github.com/infinite-creation/vitepress-unocss-starter/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  } as any,

  vite: {
    plugins: [
      Unocss(),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],
})
