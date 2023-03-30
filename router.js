import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 判断是否为开发环境
const isDev = process.env.NODE_ENV !== 'production'

const routeMap = {}

let basePath = ''
// 是客户端的同时不是开发环境才改变basePath
if (process.client && !isDev) {
  const regex = /\/[A-Za-z]:(\/(?:[^/]+\/)+dist\/)/

  // if判断处理服务打开html和file协议打开html，浏览器打开basePath的不同
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
    // console.log('to,from', to, from)
    // 不是客户端或者是开发环境不进行路由替换
    if (!process.client || isDev) next()

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
  })
  return router
}

function fixRoutes(defaultRoutes, store) {
  // 不是客户端或者是开发环境不改变路由规则
  if (!process.client || isDev) return defaultRoutes
  // default routes that come from `pages/`
  // Filter some routes using the content of the store for example
  return defaultRoutes.map((item) => {
    item.path = routeMap[item.path] =
      item.name === 'index'
        ? basePath + item.path.substring(1) + 'index.html'
        : basePath + item.path.substring(1) + '/index.html'
    // console.log('item', item)
    return item
  })
}
