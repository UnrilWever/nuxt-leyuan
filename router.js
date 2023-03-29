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

  return new Router({
    ...options,

    routes: fixRoutes(options.routes, store),
  })
}

function fixRoutes(defaultRoutes, store) {
  const regex = /.*dist/g
  let basePath = ''
  if (process.browser) basePath = window.location.href.match(regex)[0]

  // default routes that come from `pages/`
  // Filter some routes using the content of the store for example
  return defaultRoutes.map((item) => {
    if (process.browser) {
      item.path =
        item.name === 'index'
          ? basePath + item.path + 'index.html'
          : basePath + item.path + '/index.html'

      console.log(item)
    }
    return item
  })
}
