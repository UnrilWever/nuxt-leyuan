import Vue from 'vue'
import Router from 'vue-router'
import { throttle } from 'lodash'

Vue.use(Router)

// 判断是否为开发环境
const isDev = process.env.NODE_ENV !== 'production'
// 路由path到name的map
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
  router.beforeEach(function (to, from, next) {
    console.log('from to', from, to)
    // 不是客户端 或者 是开发环境 不进行路由替换
    if (!process.client || isDev) {
      next()
      return
    }
    const regex = /^\/[A-Za-z]:/
    // 处理第一次跳转path 前缀有类似 /C: 这种情况
    if (to.path.search(regex) !== -1 && !to.name) {
      const newPath = to.path.replace(regex, '')
      console.log('之后调用next({ path: newPath })', newPath)
      next({ path: newPath, replace: true })
      // 处理例如<NuxtLink to="/home/arealist">跳转到arealist</NuxtLink>这种跳转
    } else if (routeMap[to.path]) {
      console.log(
        '之后调用next({ name: routeMap[to.path] })',
        routeMap[to.path]
      )
      next({ path: routeMap[to.path], replace: true })
    } else {
      console.log('之后调用next()', to.path)
      next({ replace: true })
    }
  })
  return router
}

function fixRoutes(defaultRoutes, store) {
  // 不是客户端或者是开发环境不改变路由规则
  if (!process.client || isDev) return defaultRoutes
  // default routes that come from `pages/`
  // Filter some routes using the content of the store for example
  return defaultRoutes.map((item) => {
    // 路由path到name的map
    // routeMap[item.path] = item.name
    item.path = routeMap[item.path] =
      item.name === 'index'
        ? basePath + item.path.substring(1) + 'index.html'
        : basePath + item.path.substring(1) + '/index.html'
    return item
  })
}
