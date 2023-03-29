import Vue from 'vue'
import Router from 'vue-router'

// import MyPage from '~/components/my-page'

Vue.use(Router)

export function createRouter(
  ssrContext,
  createDefaultRouter,
  routerOptions,
  config,
  store
) {
  const options =
    routerOptions || createDefaultRouter(ssrContext, config).options

  const router = new Router({
    ...options,

    routes: fixRoutes(options.routes, store),
  })

  router.beforeEach((to, from, next) => {
    console.log('beforeEacth')
    next('index')
  })
  return router
}

function fixRoutes(defaultRoutes, store) {
  const regex = /.*dist/g
  let basePath = ''
  if (process.browser) basePath = window.location.href.match(regex)[0]

  // default routes that come from `pages/`
  // Filter some routes using the content of the store for example
  return defaultRoutes.map((item) => {
    // 文件绝对路径路由匹配
    // if (process.browser) {
    //   item.path =
    //     item.name === 'index'
    //       ? basePath + item.path + 'index.html'
    //       : basePath + item.path + '/index.html'

    //   console.log(item)
    // }
    return item
  })
}
