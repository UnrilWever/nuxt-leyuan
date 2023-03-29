// 判断是否为开发环境
const isDev = process.env.NODE_ENV !== 'production'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'app-233leyuan-v7',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // 开发环境使用vite
    'nuxt-vite',
  ],
  // 开发环境用vite要把ssr关掉，不然页面无法正常显示
  ssr: !isDev,
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // 下面是修改nuxt默认路由规则的modules
    // With options
    [
      '@nuxtjs/router',
      {
        /* module options */
        keepDefaultRouter: true,
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  //   baseURL: '/',
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extend(config, { isClient, loaders }) {
    //   console.log('loaders', loaders)
    // },
    // publicPath: '/',
    // 让打包出来的js文件不是数字名，默认是数字名，应该是为了安全考虑
    filenames: {
      chunk: () => '[name].js',
    },
  },
  router: {
    base: isDev ? '/' : './',
    // base: '/',
  },
}
