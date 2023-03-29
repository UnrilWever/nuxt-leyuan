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
    console.log('to from', to, from)

    if (process.browser) {
      console.log(to)
      if (to.name) {
        next()
      } else {
        console.log('之后就是重定向了')
        next({ name: 'index' })
      }
    } else {
      next()
    }
  })
  return router
}

function fixRoutes(defaultRoutes, store) {
  const regex = /\/[A-Za-z]:(\/(?:[^/]+\/)+)/

  let basePath = ''
  // // if (process.browser) basePath = window.location.href.match(regex)[0]
  if (process.browser) {
    // const basePath = window.location.href
    //   .replace('index.html', '')
    //   .replace('file:///C:', '')

    basePath = window.location.pathname.match(regex)[1]
  }
  // default routes that come from `pages/`
  // Filter some routes using the content of the store for example
  return defaultRoutes.map((item) => {
    if (process.browser) {
      item.path =
        item.name === 'index'
          ? basePath + item.path.substring(1) + 'index.html'
          : basePath + item.path.substring(1) + '/index.html'

      console.log(item)
    }
    return item
  })
}
