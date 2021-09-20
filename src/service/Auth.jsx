const setAuth = data => {
  let CryptoJS = require('crypto-js')
  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'user_info')
  localStorage.setItem('auth_store', ciphertext.toString())
}

const getAuth = () => {
  let CryptoJS = require('crypto-js')
  let sessi = localStorage.getItem('auth_store')
  if (!sessi) return false
  let bytes = CryptoJS.AES.decrypt(sessi, 'user_info')
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}

const removeAuth = () => {
  localStorage.removeItem('auth_store')
}

export const AuthStore = {
  setAuth,
  getAuth,
  removeAuth,
}