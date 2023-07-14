import axios from "axios"
import { getItem } from "src/utils/localStorage"
axios.interceptors.request.use(
  (config) => {
    const token = getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

