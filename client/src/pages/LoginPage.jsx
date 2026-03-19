import React, { useState, useEffect } from 'react'
import { BarChart3, Mail, Lock, Eye, EyeOff, TrendingUp, User, ArrowUp, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, signup, isLoading, error, isAuthenticated } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [localError, setLocalError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLocalError('')
    setSuccessMessage('')

    if (!email || !password) {
      setLocalError('Please fill in all fields')
      return
    }

    try {
      await login(email, password)
      setSuccessMessage('Login successful! Redirecting...')
      setEmail('')
      setPassword('')
      // Navigation handled by useEffect above
    } catch (err) {
      setLocalError(err.message || 'Login failed. Please try again.')
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLocalError('')
    setSuccessMessage('')

    if (!email || !password || !username) {
      setLocalError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long')
      return
    }

    try {
      await signup(username, email, password)
      setSuccessMessage('Signup successful! Redirecting...')
      setEmail('')
      setPassword('')
      setUsername('')
      // Navigation handled by useEffect above
    } catch (err) {
      setLocalError(err.message || 'Signup failed. Please try again.')
    }
  }

  const handleSubmit = isSignup ? handleSignup : handleLogin

  const toggleMode = () => {
    setIsSignup(!isSignup)
    setLocalError('')
    setSuccessMessage('')
    setEmail('')
    setPassword('')
    setUsername('')
  }

  // floating icons positions & styles
  const floatingItems = [
    { Icon: TrendingUp, style: { top: '10%', left: '15%', animationDuration: '12s' } },
    { Icon: User, style: { top: '30%', right: '10%', animationDuration: '8s', animationDelay: '2s' } },
    { Icon: ArrowUp, style: { bottom: '20%', left: '20%', animationDuration: '10s', animationDelay: '4s' } },
    { Icon: MessageCircle, style: { bottom: '15%', right: '25%', animationDuration: '14s', animationDelay: '1s' } },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden cosmic-bg flex flex-col">
      {/* floating background icons */}
      {floatingItems.map(({ Icon, style }, idx) => (
        <Icon
          key={idx}
          className="absolute w-16 h-16 text-white/20 floating-icon"
          style={style}
        />
      ))}

      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 z-10">
        <div className="flex items-center space-x-3 cursor-pointer logo-hover">
          <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-sky-400 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-transparent font-bold text-xl bg-clip-text bg-gradient-to-r from-fuchsia-300 via-indigo-200 to-sky-200">
            CreatorLens
          </span>
        </div>
        <div className="space-x-6 text-white text-lg">
          <a href="#" className="transition-all duration-300 hover:text-fuchsia-300 hover:underline">Home</a>
          <a href="#" className="transition-all duration-300 hover:text-fuchsia-300 hover:underline">Profile</a>
          <a href="#" className="transition-all duration-300 hover:text-fuchsia-300 hover:underline">About Us</a>
          <a href="#" className="transition-all duration-300 hover:text-fuchsia-300 hover:underline">Contacts</a>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-grow flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4">
          Detect Fake Influencers Instantly
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mt-4 max-w-2xl">
          CreatorLens is an analytics platform that helps brands and creators detect fake followers, measure real engagement, and discover trustworthy influencers.
        </p>
        <div className="mt-8 space-x-4">
          <button
            onClick={() => setShowForm(true)}
            className="glass-button px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            Get Started
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-3 rounded-full text-white font-semibold border-2 border-white/30 transition-all duration-300 hover:bg-white/10 hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Features section */}
      <FeaturesSection />

      {/* Login form modal */}
      {showForm && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
          <div className="w-full max-w-md glass-panel rounded-2xl shadow-[0_0_30px_rgba(147,51,234,0.3)] p-8 max-h-[90vh] overflow-y-auto border border-white/20">
            <h2 className="text-3xl font-bold text-center text-white mb-2 bg-gradient-to-r from-fuchsia-300 via-indigo-200 to-sky-200 bg-clip-text text-transparent">
              {isSignup ? 'Create Account' : 'Sign In'}
            </h2>
            
            {/* Error Message */}
            {(localError || error) && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-400 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{localError || error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-4 bg-green-500/20 border border-green-400 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-green-200 text-sm">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username field (signup only) */}
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-white/70" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="johndoe"
                      className="w-full pl-10 pr-4 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 focus:border-fuchsia-400/50 backdrop-blur-sm transition-all"
                      required={isSignup}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-white/70" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 focus:border-fuchsia-400/50 backdrop-blur-sm transition-all disabled:opacity-50"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-white/70" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 focus:border-fuchsia-400/50 backdrop-blur-sm transition-all disabled:opacity-50"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/70 hover:text-white disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-400 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all disabled:opacity-50 mt-6 hover:scale-105"
              >
                {isLoading ? (isSignup ? 'Creating account...' : 'Signing in...') : (isSignup ? 'Sign Up' : 'Sign In')}
              </button>

              {/* Toggle between signup and login */}
              <div className="text-center mt-4">
                <p className="text-white/80 text-sm">
                  {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    disabled={isLoading}
                    className="text-fuchsia-300 hover:text-fuchsia-200 font-semibold transition-colors disabled:opacity-50"
                  >
                    {isSignup ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


// FeaturesSection and supporting hooks/components
function FeaturesSection() {
  const features = [
    {
      title: 'Fake Follower Detection',
      desc: 'Identify suspicious or inactive followers using intelligent analytics and engagement analysis.',
    },
    {
      title: 'Engagement Analytics',
      desc: 'Measure real engagement rates including likes, comments, and audience interaction quality.',
    },
    {
      title: 'Influencer Authenticity Score',
      desc: 'Calculate a trust score that helps brands identify authentic creators with real audiences.',
    },
    {
      title: 'Creator Comparison',
      desc: 'Compare multiple creators to discover the most effective influencer partnerships.',
    },
  ]

  return (
    <div className="z-10 px-6 py-16">
      <h2 className="text-4xl text-white font-bold text-center mb-12">Platform Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <FeatureCard key={i} title={f.title} desc={f.desc} />
        ))}
      </div>
    </div>
  )
}

function FeatureCard({ title, desc }) {
  const [ref, visible] = useInView()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-panel p-6 rounded-xl border border-white/20 hover:border-fuchsia-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:scale-105"
    >
      <h3 className="text-white text-xl font-semibold mb-2 bg-gradient-to-r from-fuchsia-300 to-indigo-200 bg-clip-text text-transparent">{title}</h3>
      <p className="text-white/80 text-sm">{desc}</p>
    </motion.div>
  )
}

function useInView() {
  const ref = React.useRef(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}
