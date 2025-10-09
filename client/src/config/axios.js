import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // allow sending cookies for same-site auth
})

// attach Authorization header dynamically from localStorage when available
axiosInstance.interceptors.request.use((config) => {
    try {
        const app = localStorage.getItem('app')
        if (app) {
            const parsed = JSON.parse(app)
            if (parsed?.token) config.headers = { ...config.headers, Authorization: `Bearer ${parsed.token}` }
        } else if (localStorage.getItem('token')) {
            const t = localStorage.getItem('token')
            config.headers = { ...config.headers, Authorization: `Bearer ${t}` }
        }
    } catch {
        // ignore parse errors
    }
    return config
})

export default axiosInstance