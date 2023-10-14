const utils = {
  isObject: (params) => Object.prototype.toString.call(params) === "[object Object]",
  isArray: (params) => Object.prototype.toString.call(params) === "[object Array]",
  isFunction: (params) => Object.prototype.toString.call(params) === "[object Function]",
}

export default utils