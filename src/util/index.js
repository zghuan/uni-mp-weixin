export function formatParam (params) {
  let parameter = ''
  for (var key in params) {
    parameter += `${key}=${params[key]}&`
  }
  parameter = parameter.substr(0, parameter.length - 1)
  return parameter
}
export function formatDate (number, format = 'Y-M-D h:m:s') {
  // 数据转化
  function formatNumber (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  let formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
  let returnArr = []

  let date = new Date(number)
  returnArr.push(date.getFullYear())
  returnArr.push(formatNumber(date.getMonth() + 1))
  returnArr.push(formatNumber(date.getDate()))

  returnArr.push(formatNumber(date.getHours()))
  returnArr.push(formatNumber(date.getMinutes()))
  returnArr.push(formatNumber(date.getSeconds()))

  for (let i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i])
  }
  return format
}

// 解析时间日期函数
export function parseTime (time, cFormat) {
  time = time || new Date()
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  // console.log(timeStr)
  return timeStr
}
/**
 * 数字运算（主要用于小数点精度问题）
 * @author Hjs
 * @param {number} a 前面的值
 * @param {'+'|'-'|'*'|'/'} type 计算方式
 * @param {number} b 后面的值
 * @example
 * ```js
 * // 可链式调用
 * const res = CalculationPrice(1.3, '-', 1.2).next('+', 1.5).next('*', 2.3).next('/', 0.2).result;
 * console.log(res);
 * ```
 */
export function CalculationPrice (a, type, b) {
  /**
   * 获取数字小数点的长度
   * @param {number} n 数字
   */
  function getDecimalLength (n) {
    const decimal = n.toString().split('.')[1]
    return decimal ? decimal.length : 0
  }
  /** 倍率 */
  const power = Math.pow(10, Math.max(getDecimalLength(a), getDecimalLength(b)))
  let result = 0

  // 防止出现 `33.33333*100000 = 3333332.9999999995` && `33.33*10 = 333.29999999999995` 这类情况做的暴力处理
  a = Math.round(a * power)
  b = Math.round(b * power)

  switch (type) {
    case '+':
      result = (a + b) / power
      break
    case '-':
      result = (a - b) / power
      break
    case '*':
      result = (a * b) / (power * power)
      break
    case '/':
      result = a / b
      break
  }

  return {
    /** 计算结果 */
    result,
    /**
     * 继续计算
     * @param {'+'|'-'|'*'|'/'} nextType 继续计算方式
     * @param {number} nextValue 继续计算的值
     */
    next (nextType, nextValue) {
      return CalculationPrice(result, nextType, nextValue)
    }
  }
}