import axios from "axios";
import { message } from "antd"
import utils from "./utils";
import { removeToken, getToken } from "./cookies"
import qs from "qs"

// Default request domain
axios.defaults.baseURL = "http://localhost:8000/"
axios.defaults.timeout = 5 * 60 * 1090
axios.defaults.headers.common["Authorization"] = getToken()

// Global request interceptor
axios.interceptors.request.use(
  config => {
    if (config.data && config.data.transFormData) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      config.headers['Access-Control-Allow-Origin'] = '*'
      delete config.datatransFormData
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

function ajax(ajaxData = {} ) {
  if (ajaxData.transFormData) {
    ajaxData.data = { ...ajaxData.data, transFormData: true }
  }
  return new Promise((resolve, reject) => {
    if (!utils.isObject(ajaxData)) {
      return reject(new Error("Incorrect ajax request configuration"))
    }
    let method = ajaxData.type || 'GET'
    method = method.toLowerCase()
    let url = ajaxData.url
    let data = method === "get" || method === "delete" ? {params: ajaxData.data } : ajaxData.data;
    
    axios[method](url, data).then(res => {
      if (res.data.status === 30009 || res.data.status === 40006 || res.data.status === 40005){
        removeToken()
        message.error("Network request error!")
        reject(res)
      }else {
        resolve(res.data)
      }
    }).catch(err => {
      let response = err.response
      if (response){
        switch (response.status) {
          case 401:
            removeToken()
            // window.location.replace(sysConfig.logout url)
            message.error("Network request error!")
            break
          case 500:
            message.error("Server response failed")
            break
          case 504:
            message.error("Request timeout")
            break
        }
      }
      reject(err)
    })
  })
}

export default ajax
