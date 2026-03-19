import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Set token in axios headers whenever it changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('token', token)
    } else {
      delete api.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }, [token])

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.post('/auth/login', { email, password })
      setToken(response.data.token)
      setUser(response.data.user)
      return response.data
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        (err.request ? 'Cannot reach the server. Make sure the backend is running on port 3000.' : null) ||
        'Login failed. Please try again.'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (username, email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.post('/auth/signup', { username, email, password })
      setToken(response.data.token)
      setUser(response.data.user)
      return response.data
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        (err.request ? 'Cannot reach the server. Make sure the backend is running on port 3000.' : null) ||
        'Signup failed. Please try again.'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  const value = {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
