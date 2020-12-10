import * as types from './mutations-type'
export default {
  [types.SET_ZGH] (state, zgh) {
    state.zgh = zgh
  }
}