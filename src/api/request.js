import store from '@/store'
import { formatParam } from '@/util'
import getCurrentPage from '@/util/getCurrentPage'
const __API__ = process.env.NODE_ENV === 'development' ? 'https://task-api-stag.zowoyoo.com' : 'https://task-api.zowoyoo.com'
// const __API__ = 'https://task-api.zowoyoo.com'
let isPageLogin = true

export const request = (url, obj = {}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      header: {
        appid: store.state.appId,
        channel: 6,
        authtoken: store.state.token
      },
      url: __API__ + url,
      method: obj.method || 'GET',
      data: obj.data,
      success (data) {
        if (data.statusCode === 403) {
          uni.showToast({
            title: '当前小程序已停用或没有配置！',
            icon: 'none',
            duration: 5000
          })
        }
        if (data.statusCode === 401 && isPageLogin) {
          isPageLogin = false
          let { path, options } = getCurrentPage()
          if (path.includes('login')) return
          uni.showToast({
            title: '身份信息过期正在重新登陆',
            icon: 'loading'
          })
          uni.navigateTo({
            url: '/pages/login/index?fullPath=' + encodeURIComponent(path + '?' + formatParam(options)),
            success () {
              setTimeout(() => {
                isPageLogin = true
              }, 500)
            }
          })
        }
        if (data.statusCode >= 500) {
          uni.showToast({
            title: data.statusCode + '服务器开小差了！',
            icon: 'none',
            duration: 5000,
            mask: true
          })
        }
        if (url.includes('login')) {
          store.commit('setToken', data.header.authtoken)
        }
        resolve(data.data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}
export default request
