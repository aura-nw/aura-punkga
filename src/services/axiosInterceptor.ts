import axios from "axios"

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export default api
