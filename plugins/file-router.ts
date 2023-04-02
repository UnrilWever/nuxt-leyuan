import { RawLocation } from "vue-router";
import { Plugin } from "@nuxt/types";
import { toRelaHtmlPath } from "~/src/utils/fileRouter";

declare module "vue/types/vue" {
  interface Vue {
    $fileRouter: { push: (to: RawLocation) => void };
  }
}

/** 注册插件调用 */
const fileRouterPlugin: Plugin = ({ app }, inject) => {
  // 判断是在正常环境还是开发环境
  const isDev = process.env.NODE_ENV !== "production";

  // 定义一个类型别名，表示跳转的参数可以是字符串或对象
  type NavicateParam =
    | string
    | {
        path: string;
        query?: Record<string, string>;
      };
  // type NavicateParam = RawLocation

  /** 定义一个辅助函数，把对象参数转换成URL字符串 */
  function toURL(param: NavicateParam): string {
    if (typeof param === "string") {
      return param;
    }
    let url = toRelaHtmlPath(param.path);
    if (param.query) {
      // 把query对象转换成key=value的形式，并用&连接
      const queryStr = Object.entries(param.query)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      url += `?${queryStr}`;
    }
    return url;
  }

  /** 用于file协议跳转的自定义push */
  function filePush(param: NavicateParam) {
    // 获取vue-router实例
    const router = app.router;
    // 判断环境变量
    console.log("isDev", isDev);
    if (isDev) {
      // 开发环境，用vue-router的push方法跳转
      router?.push(param);
    } else {
      // 生产环境，用window.location.assign方法跳转
      window.location.assign(toURL(param));
    }
  }

  inject("fileRouter", { push: filePush });
};

export default fileRouterPlugin;
