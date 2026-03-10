import { createContext, useContext, useState, useCallback } from 'react'
import api from '../utils/api'

const AuthContext = createContext(null)

const TOKEN_KEY = 'jazzs_token'
const USER_KEY = 'jazzs_user'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem(USER_KEY)
            return savedUser ? JSON.parse(savedUser) : null
        } catch {
            return null
        }
    })
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null)
    const [loading, setLoading] = useState(false)

    const persistSession = useCallback((userData, tokenValue) => {
        setUser(userData)
        setToken(tokenValue)
        localStorage.setItem(USER_KEY, JSON.stringify(userData))
        localStorage.setItem(TOKEN_KEY, tokenValue)
    }, [])

    const login = useCallback(async ({ email, password }) => {
        setLoading(true)
        try {
            // Backend expects 'username' and returns `{ token: "..." }`
            const response = await api.post('/api/auth/login', { username: email, password })
            const { token: tokenValue } = response.data

            // Mock user data since backend doesn't return user object yet
            // In a real app, you might fetch /api/me here
            const userData = { email, name: email.split('@')[0] }
            persistSession(userData, tokenValue)
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Invalid email or password')
        } finally {
            setLoading(false)
        }
    }, [persistSession])

    const register = useCallback(async ({ name, email, password }) => {
        setLoading(true)
        try {
            // Backend expects 'username' instead of 'email'
            await api.post('/api/auth/register', { username: email, password })

            // Auto-login after registration
            await login({ email, password })
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }, [login])

    const logout = useCallback(() => {
        setUser(null)
        setToken(null)
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(TOKEN_KEY)
    }, [])

    const value = { user, token, loading, register, login, logout, isAuthenticated: !!user }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
    return ctx
}
