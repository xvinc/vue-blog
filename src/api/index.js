import axios from "axios";
import NProgress from 'nprogress'

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://localhost:3000/v1/' : 'http://localhost:3000/v1/'
console.log(baseUrl)
//拦截器
axios.interceptors.request.use(
  function (config) {
    NProgress.start()
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    NProgress.done()
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 获取所有的文章
export const getArticleAll = (params = {}) => axios.get(`${baseUrl}articles`, {
  params
})


// 获取文章详情
export const getDetail = (postId) => axios.get(`${baseUrl}details?postId=${postId}`)


// 文章阅读次数
export const readCountIncrease = (postId) => axios.post(`${baseUrl}readNum`, {
  postId: postId
})
