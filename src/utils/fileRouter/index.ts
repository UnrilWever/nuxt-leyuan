/** 把/home/arealist 绝对路径变为 ./home/arealist/index.html */
export function toRelaHtmlPath(path: string) {
  const isIndex = path === "/";
  return `.${path}${isIndex ? "" : "/"}index.html`;
}

// 定义一个类型别名，表示跳转的参数可以是字符串或对象
export type NavicateParam =
  | string
  | {
      path: string;
      query?: Record<string, string>;
    };
// type NavicateParam = RawLocation

/** 定义一个辅助函数，把对象参数转换成URL字符串 */
export function toURL(param: NavicateParam): string {
  if (typeof param === "string") {
    return toRelaHtmlPath(param);
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
