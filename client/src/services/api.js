import axios from 'axios'

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')
const API_BASE = configuredBaseUrl || (import.meta.env.DEV ? 'http://localhost:3000/api' : '/api')

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
})

// Auth endpoints
export const login = (email, password) => {
  return api.post('/auth/login', { email, password })
}

export const signup = (username, email, password) => {
  return api.post('/auth/signup', { username, email, password })
}

// Creator analysis endpoints
export const analyzeCreator = (username) => {
  return api.post('/analyze', { username })
}

export const compareCreators = (username1, username2) => {
  return api.post('/compare', { username1, username2 })
}

export const getReports = () => {
  return api.get('/reports')
}

export default api
