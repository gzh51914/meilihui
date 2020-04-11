import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://www.mei.com', // 基本的url
  timeout: 3000 // 延时默认3秒
})

export default instance
