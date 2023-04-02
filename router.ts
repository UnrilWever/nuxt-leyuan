import Vue from "vue";
import Router, { Route } from "vue-router";
import { NuxtConfig } from "@nuxt/types";

Vue.use(Router);

// 判断是否为开发环境
const isDev = process.env.NODE_ENV !== "production";
// 路由path到name的map
export const routeMap: Record<string, string> = {};

let basePath = "";
// 是客户端的同时不是开发环境才改变basePath
if (process.client && !isDev) {
  const regex = /\/[A-Za-z]:(\/(?:[^/]+\/)+dist\/)/;
  const matchRes = window.location.pathname.match(regex);
  // if判断处理服务打开html和file协议打开html，浏览器打开basePath的不同
  if (matchRes) basePath = matchRes[1];
}

/**
 * nuxt用该方法重新修改路由规则
 * details:https://nuxt.com/modules/router
 * @param {*} ssrContext *
 * @param {*} createDefaultRouter *
 * @param {*} routerOptions *
 * @param {*} config *
 * @param {*} store *
 * @returns {Router} router
 */
export function createRouter(
  ssrContext: any,
  createDefaultRouter: (
    arg0: any,
    arg1: any
  ) => { (): any; new (): any; options: any },
  routerOptions: any,
  config: NuxtConfig
): Router {
  const options =
    routerOptions || createDefaultRouter(ssrContext, config).options;
  const router = new Router({
    ...options,
    routes: fixRoutes(options.routes),
  });
  router.beforeEach((to, from, next) => {
    console.log("from,to", from, to);
    // 不是客户端 或者 是开发环境 不进行路由替换
    if (!process.client || isDev) {
      next();
      return;
    }
    const regex = /^\/[A-Za-z]:/;
    const { path, query } = to;
    // 处理第一次跳转path 前缀有类似 /C: 这种情况
    if (path.search(regex) !== -1 && !to.name) {
      const newPath = path.replace(regex, "");
      console.log("之后调用next({ path: newPath })", newPath);

      next({ path: newPath, query, replace: !isDev });
      // 处理路由跳转例如<NuxtLink to="/home/arealist">跳转到arealist</NuxtLink>这种跳转
    } else if (routeMap[path]) {
      console.log("之后调用next({ name: routeMap[path] })", routeMap[path]);
      next({ name: routeMap[path], query, replace: !isDev });
    } else {
      console.log("之后调用next()");
      next();
    }
  });
  return router;
}

/**
 * 修改路由默认规则
 * @param {*} defaultRoutes 默认路由配置
 * @returns {*} 默认路由配置
 */
function fixRoutes(defaultRoutes: Route[]) {
  // 不是客户端或者是开发环境不改变路由规则
  if (!process.client || isDev) return defaultRoutes;
  // default routes that come from `pages/`
  // Filter some routes using the content of the store for example
  return defaultRoutes.map((item) => {
    // 路由path到name的map
    if (item.name) routeMap[item.path] = item.name;

    item.path =
      item.name === "index"
        ? basePath + item.path.substring(1) + "index.html"
        : basePath + item.path.substring(1) + "/index.html";
    return item;
  });
}
