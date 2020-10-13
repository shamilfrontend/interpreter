const config = require('./server/config')

module.exports = {
  srcDir: 'client/',

  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  loading: {
    color: '#0065FF'
  },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    'normalize.css/normalize.css',
    './assets/styles/fonts/font-inter/stylesheet.css',
    './assets/styles/main.scss'
  ],

  plugins: [
    {
      src: '@/plugins/client',
      ssr: false
    },
    '@/plugins/element-ui',
    '@/plugins/axios'
  ],

  buildModules: ['@nuxtjs/eslint-module'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [
      'nuxt-i18n',
      {
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          alwaysRedirect: false,
          fallbackLocale: 'en'
        },
        locales: [
          {
            name: 'Russian',
            code: 'ru',
            iso: 'ru-RU',
            file: 'ru-RU.js'
          },
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          }
        ],
        lazy: true,
        langDir: 'languages/',
        defaultLocale: 'en'
      }
    ]
  ],

  server: {
    port: config.PORT
  },

  axios: {
    baseURL: config.BASE_URL
  },

  build: {
    transpile: [/^element-ui/],

    extend(config, ctx) {}
  }
}
