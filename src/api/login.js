import request from './request'
export async function getSendCode (params) {
  return request(`/api/product/common/products`, {
    data: params
  })
}
export async function userLoginUrl (params) {
  return request(`/api/product/common/products`, {
    data: params
  })
}