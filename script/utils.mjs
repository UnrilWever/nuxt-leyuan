import { execa } from 'execa'

// 执行控制台脚本
export const binRun = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
