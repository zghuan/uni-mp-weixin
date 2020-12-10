/**
 * 获取当前页面路由信息
 */
export default function getCurrentPage () {
  // eslint-disable-next-line no-undef
  const pages = getCurrentPages() // 拿到所有路由栈
  const currentPage = pages[pages.length - 1] // 达到当前
  const path = currentPage.route // 拿到url地址
  const options = currentPage.options // 拿到参数
  return {
    pages,
    currentPage,
    path,
    options
  }
}