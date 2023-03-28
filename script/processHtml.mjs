import fs from 'fs'
import path from 'path'
import { binRun } from './utils.mjs'

const htmlFilePaths = []

function readDir(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      readDir(filePath)
    } else if (path.extname(file) === '.html') {
      htmlFilePaths.push(filePath)
    }
  }
}

function modifyHtml(content, filePath) {
  // 修改内容
  content = changeBaseHref(content, filePath)
  return content
}

/** 修改路径前缀 */
function changeBaseHref(content, filePath) {
  const reg = /@r@e@l@a@/g
  const prefix = calcPath(filePath, 'dist')

  content = content.replace(reg, prefix)
  return content
}

function calcPath(from, to) {
  const originRes = path.relative(from, to)
  const cdLen = originRes.split('\\').length - 1
  if (cdLen === 0) return '.'
  const cdArr = new Array(cdLen).fill('..')
  return cdArr.join('/')
}

readDir('./dist')

for (const filePath of htmlFilePaths) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const modifiedContent = modifyHtml(fileContent, filePath)
  fs.writeFileSync(filePath, modifiedContent)
  // 最后顺便格式化一下代码
  try {
    await binRun('pnpm', ['prettier', '--write', filePath])
  } catch (error) {
    console.error('格式化失败,错误信息:', error)
  }
}
