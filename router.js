import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routeMap = {}

let basePath = ''
if (process.client) {
  const regex = /\/[A-Za-z]:(\/(?:[^/]+\/)+)/
  basePath = window.location.pathname.match(regex)[1]
}

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
    console.log('to,from', to, from)
    if (process.client) {
      const regex = /^\/[A-Za-z]:/
      // 处理第一次跳转path 前缀有类似 /C: 这种情况
      if (to.path.search(regex) !== -1) {
        const newPath = to.path.replace(regex, '')
        next({ path: newPath })
        // 处理例如<NuxtLink to="/home/arealist">跳转到arealist</NuxtLink>这种跳转
      } else if (routeMap[to.path]) {
        next({ path: basePath + to.path + '/index.html' })
      }
      next()
    } else {
      next()
    }
  })
  return router
}

function fixRoutes(defaultRoutes, store) {
  // default routes that come from `pages/`
  // Filter some routes using the content of the store for example
  return defaultRoutes.map((item) => {
    if (process.client) {
      item.path = routeMap[item.path] =
        item.name === 'index'
          ? basePath + item.path.substring(1) + 'index.html'
          : basePath + item.path.substring(1) + '/index.html'
    }
    console.log('item', item)
    return item
  })
}
