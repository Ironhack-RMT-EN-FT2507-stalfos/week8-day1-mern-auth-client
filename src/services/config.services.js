import axios from "axios";

//1. all requests will be to `${import.meta.env.VITE_SERVER_URL}/api
const service = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

//2. all requests will be accompanied by the token (if it exists)
service.interceptors.request.use((config) => {

  const authToken = localStorage.getItem("authToken")

  if (authToken) {
    config.headers.authorization = `Bearer ${authToken}`
  }

  return config

})

export default service
