import colors from 'vuetify/es5/util/colors'

const PORT = process.env.PORT || 8098;
const BACKEND_URL = `http://localhost:${PORT}`;
const PREFIX = '/api/v1';

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  ssr: false, // not sure

  generate: {
    dir: 'target/dist'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - template',
    title: 'template',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },


  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/style/global.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/startup-config.ts',
    '@/plugins/axios-accessor.ts',
    '@/plugins/type-di.ts'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-i18n'
  ],

  // i18n: https://i18n.nuxtjs.org and https://kazupon.github.io/vue-i18n/introduction.html
  i18n: {
    defaultLocale: 'en',
    langDir: 'i18n/',
    locales: [
      { code: 'en', iso: 'en-GB', file: 'en.ts' },
    ],
    lazy: true,
  },

  publicRuntimeConfig: {
    axios: {
      //baseURL: process.env.BASE_URL,
      //prefix: process.env.BASE_URL,
    }
  },

  privateRuntimeConfig: {

  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: PREFIX
  },

  proxy: {
    '/api': BACKEND_URL
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
