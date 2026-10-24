// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-22',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/sitemap'],

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  css: ['~/assets/styles/global.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'ja' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=Mochiy+Pop+P+One&display=swap',
        },
        { rel: 'alternate', type: 'application/rss+xml', title: 'あおつきのホームページ', href: '/rss.xml' },
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-5B7WJYQKQ8',
        },
        {
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-5B7WJYQKQ8');`,
        },
      ],
    },
  },

  site: {
    url: 'https://aomixer.com',
    name: 'あおつきのホームページ',
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/blog/',
        '/about/',
        '/link/',
        '/rss.xml',
        '/blog/20250420_2/',
        '/blog/20250420_test/',
        '/blog/20250421_1/',
        '/blog/page/1/',
      ],
      failOnError: true,
    },
  },

  router: {
    options: {
      strict: false,
    },
  },
})
