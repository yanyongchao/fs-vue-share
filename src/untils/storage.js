/* Storage的存储方式  */

function getStorage (storage) {
  return function (key) {
    let value
    try {
      return (value = storage.getItem(key)) && typeof value !== 'undefined'
        ? JSON.parse(value)
        : undefined
    } catch (err) {}
    return undefined
  }
}

function setStorage (storage) {
  return function (key, value) {
    return storage.setItem(key, JSON.stringify(value))
  }
}

// localStorage的存贮获取
export const local = {
  getItem: getStorage(localStorage),
  setItem: setStorage(localStorage)
}

// sessionStorage的存贮获取
export const session = {
  getItem: getStorage(sessionStorage),
  setItem: setStorage(sessionStorage)
}
