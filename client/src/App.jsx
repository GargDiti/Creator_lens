import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import AnalyzerPage from './pages/AnalyzerPage'
import Analytics from './pages/Analytics'
import ComparePage from './pages/ComparePage'
import About from './pages/About'
import NavbarNew from './components/NavbarNew'
import './index.css'

function ProtectedRoutes() {
  const { isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Route path="/" element={<><NavbarNew onLogout={logout} /><Home /></>} />
      <Route path="/analyze" element={<><NavbarNew onLogout={logout} /><AnalyzerPage onLogout={logout} /></>} />
      <Route path="/analytics" element={<><NavbarNew onLogout={logout} /><Analytics /></>} />
      <Route path="/compare" element={<><NavbarNew onLogout={logout} /><ComparePage onLogout={logout} /></>} />
      <Route path="/about" element={<><NavbarNew onLogout={logout} /><About /></>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
}

function PublicRoutes() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Route path="/login" element={<LoginPage />} />
}

function AppRoutes() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {isAuthenticated ? (
        <>
          <Route path="/" element={<><NavbarNew onLogout={logout} /><Home /></>} />
          <Route path="/analyze" element={<><NavbarNew onLogout={logout} /><AnalyzerPage /></>} />
          <Route path="/analytics" element={<><NavbarNew onLogout={logout} /><Analytics /></>} />
          <Route path="/compare" element={<><NavbarNew onLogout={logout} /><ComparePage /></>} />
          <Route path="/about" element={<><NavbarNew onLogout={logout} /><About /></>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
