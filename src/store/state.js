export default {
  token: uni.getStorageSync('token') || {
    logo: 'https://yanshi.zowoyoo.com/img/84826/1597023894381.png'
  },
  zgh: uni.getStorageSync('zgh') || 1
}