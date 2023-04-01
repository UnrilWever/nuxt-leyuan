/** 把/home/arealist 绝对路径变为 ./home/arealist/index.html */
export function toRelaHtmlPath(path: string) {
  const isIndex = path === "/";
  return `.${path}${isIndex ? "" : "/"}index.html`;
}
