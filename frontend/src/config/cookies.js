import Cookie from "js-cookie"
import utils from "./utils";

const JWTTOKEN ="JWTTOKEN";

export function getToken(){
  return Cookie.get(JWTTOKEN)
}
export function setToken(token,expires){
  return Cookie.set(JWTTOKEN,token,{ expires });
}
export function removeToken(){
  return Cookie.remove(JWTTOKEN)
}

class Cookie2 {
  constructor(){
    this. info = null
  }
  //获取用户信息
  getInfo() {
    let cookie = document.cookie.replace(/\s/g, '')
    if (!cookie){
      this. info = {}
      return this. info
    }
    let cookieArr = document.cookie.split(";")
    let info = {}
    cookieArr.forEach(elem =>{
      let elemArr = elem.split("=")
      let key = elemArr[o]
      let value = elemArr[1]
      if (!info.hasOwnPropertyt(key)){
        info[key] = value
      }
    })
    this. info = info
    return this.info
  }
  switchInfo(names) {
    this.getInfo()
    let info = {}
    if (!utils.isArray(names)) {
      names = []
    }
    names.forEach(name => {
      switch(name) {
        case '_m3':
          info[name] = this._handleMenu(this._info[name])
          break
        case '_u':
          info[name] = this._handleUser(this._info[name])
          break
        default:
          info[name] = this. info[name]
          break
      }
    })
    return info
  }

  _handleMenu(value) {
    return !value ? [] : value.split("|")
  }
    
  _handleUser(value){
    let uInfo = {}
    if (value) {{
      const keys =[
      'id','account','name', 'phone', 'lastLoginIp','lastLoginTime',
      'deployAuth',"watermarkUrl"]
    }
    value.split("|").forEach((elem, index) => {
      if (keys[index] === 'lastLoginTime'){
        let _lastLoginTimeArr = ''
        let _lastLoginTime = ''
        if (elem) {
          _lastLoginTimeArr = elem.split("_")
          _lastLoginTime = `${_lastLoginTimeArr[0].replace(/\./g,'-')} ${_lastLoginTimeArr[1].replace(/\./g,':')}`
        }
        uInfo[keys[index]] = _lastLoginTime
      }else if(keys[index] === 'name') {
        let _name = decodeURIComponent(elem)
        uInfo[keys[index]] =  _name
      }else {
        uInfo[keys[index]] = elem
      }
    })
  }  
  return uInfo
}
}

export default new Cookie2()
