import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
})

// Request interceptor – attach auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jazzs_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interceptor – handle global errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('jazzs_token')
            localStorage.removeItem('jazzs_user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api
