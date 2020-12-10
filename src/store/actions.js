import * as types from './mutations-type'
export default {
  setZgh (state, zgh) {
    uni.setStorage({
      key: 'zgh',
      data: zgh
    })
    commit(types.SET_ZGH, zgh)
  },
}