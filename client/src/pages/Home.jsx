import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Heart,
  Shield,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  Target,
  Award,
  Sparkles,
  Brain,
  Activity,
  CheckCircle,
  Star,
  Play
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import Footer from '../components/Footer'

// Particle Background Component
function ParticleBackground() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.2,
      }))
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
          }}
          transition={{
            duration: 3 + particle.speed * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [value, duration])

  return <span>{count}{suffix}</span>
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] transition-all duration-500"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      <div className="relative z-10">
        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} p-3 shadow-lg group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-300`}>
          <Icon className="h-8 w-8 text-white" />
        </div>

        <h3 className="mt-6 text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
          {title}
        </h3>

        <p className="mt-3 text-white/70 group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

// Stats Card Component
function StatsCard({ label, value, icon: Icon, gradient, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)] transition-all duration-300"
    >
      <div className={`absolute -top-12 -right-12 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-xl`} />

      <div className="relative z-10">
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold text-white">
            <AnimatedCounter value={parseInt(value.replace(/[^\d]/g, ''))} />
            {value.replace(/\d/g, '')}
          </p>
          <p className="text-sm font-medium text-white/80">{label}</p>
        </div>

        <p className="mt-2 text-xs text-white/60">{description}</p>
      </div>
    </motion.div>
  )
}

// Engagement Chart Component
function EngagementChart() {
  const data = useMemo(() => [
    { name: 'Mon', engagement: 2.1, followers: 1200 },
    { name: 'Tue', engagement: 2.8, followers: 1350 },
    { name: 'Wed', engagement: 3.2, followers: 1180 },
    { name: 'Thu', engagement: 4.1, followers: 1420 },
    { name: 'Fri', engagement: 3.8, followers: 1380 },
    { name: 'Sat', engagement: 4.5, followers: 1520 },
    { name: 'Sun', engagement: 3.9, followers: 1480 },
  ], [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Engagement Analytics</h3>
          <p className="text-white/60 text-sm">Real-time engagement tracking</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Area
            type="monotone"
            dataKey="engagement"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#engagementGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// Profile Preview Component
function ProfilePreview() {
  const [isAnalyzed, setIsAnalyzed] = useState(false)

  const mockProfile = {
    username: '@techcreator',
    name: 'Alex Chen',
    followers: '127K',
    following: '892',
    posts: '1,234',
    bio: 'Tech entrepreneur & content creator 🚀 Building the future of AI',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    authenticityScore: 89,
    engagementRate: 4.2,
    fakeFollowers: 12
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Profile Analysis</h3>
            <p className="text-white/60 text-sm">AI-powered insights</p>
          </div>
        </div>

        {!isAnalyzed && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAnalyzed(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-sm font-medium shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300"
          >
            Analyze Profile
          </motion.button>
        )}
      </div>

      {isAnalyzed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <img
              src={mockProfile.avatar}
              alt={mockProfile.name}
              className="w-16 h-16 rounded-2xl border-2 border-white/20"
            />
            <div>
              <h4 className="text-lg font-bold text-white">{mockProfile.name}</h4>
              <p className="text-white/60">{mockProfile.username}</p>
              <p className="text-white/70 text-sm mt-1">{mockProfile.bio}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-2xl font-bold text-white">{mockProfile.followers}</p>
              <p className="text-xs text-white/60">Followers</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-2xl font-bold text-white">{mockProfile.following}</p>
              <p className="text-xs text-white/60">Following</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-2xl font-bold text-white">{mockProfile.posts}</p>
              <p className="text-xs text-white/60">Posts</p>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-white font-medium">Authenticity Score</span>
              </div>
              <span className="text-green-400 font-bold">{mockProfile.authenticityScore}/100</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">Engagement Rate</span>
              </div>
              <span className="text-blue-400 font-bold">{mockProfile.engagementRate}%</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-400" />
                <span className="text-white font-medium">Fake Followers</span>
              </div>
              <span className="text-red-400 font-bold">{mockProfile.fakeFollowers}%</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
            <Play className="h-8 w-8 text-white/60" />
          </div>
          <p className="text-white/60">Click "Analyze Profile" to see AI-powered insights</p>
        </div>
      )}
    </motion.div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const [username, setUsername] = useState('')

  const features = useMemo(() => [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze engagement patterns, follower authenticity, and content quality.',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
    },
    {
      icon: Shield,
      title: 'Fake Follower Detection',
      description: 'Identify suspicious accounts, bots, and inactive followers with 95% accuracy using behavioral analysis.',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    },
    {
      icon: TrendingUp,
      title: 'Engagement Insights',
      description: 'Comprehensive metrics including reach, engagement rate, and audience interaction quality.',
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
    },
    {
      icon: Award,
      title: 'Authenticity Scoring',
      description: 'Single unified score combining all factors to help you make confident partnership decisions.',
      gradient: 'from-orange-500 via-red-500 to-pink-600',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Interactive charts and live metrics to monitor creator performance and authenticity in real-time.',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    },
    {
      icon: Sparkles,
      title: 'Smart Recommendations',
      description: 'AI-generated insights and actionable recommendations for content strategy and partnerships.',
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
    },
  ], [])

  const stats = useMemo(() => [
    {
      label: 'Creators Analyzed',
      value: '50K+',
      icon: Users,
      gradient: 'from-fuchsia-500 via-indigo-400 to-sky-400',
      description: 'Influencers scanned worldwide',
    },
    {
      label: 'Accuracy Rate',
      value: '95%',
      icon: Target,
      gradient: 'from-emerald-400 via-cyan-400 to-sky-600',
      description: 'Detection precision',
    },
    {
      label: 'Avg. Analysis Time',
      value: '<3s',
      icon: Zap,
      gradient: 'from-amber-400 via-red-400 to-pink-500',
      description: 'Lightning-fast results',
    },
    {
      label: 'Trust Score',
      value: '4.9',
      icon: Star,
      gradient: 'from-rose-500 via-pink-500 to-purple-500',
      description: 'User satisfaction rating',
    },
  ], [])

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent rounded-full" />
      </motion.div>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-white/90">AI-Powered Creator Analytics</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                CreatorLens
              </span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl text-white/90 font-light">
                AI Analytics Platform
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Transform your influencer marketing with AI-powered analytics. Detect fake followers,
              measure authentic engagement, and discover trustworthy creators instantly.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onSubmit={(e) => {
                e.preventDefault()
                navigate('/analyze')
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-8"
            >
              <motion.input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Instagram username (e.g., @creator)"
                className="w-full sm:flex-1 px-6 py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl text-white placeholder:text-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 shadow-2xl transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(147, 51, 234, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg shadow-2xl hover:shadow-[0_20px_40px_rgba(147,51,234,0.4)] transition-all duration-300 flex items-center gap-2 group"
              >
                <Brain className="h-5 w-5" />
                Analyze with AI
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white/60 text-sm"
            >
              Trusted by 10,000+ brands • 95% accuracy • Instant results
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful AI Features
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Advanced analytics powered by machine learning to give you unprecedented insights into creator authenticity and engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real-time Analytics Dashboard
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Interactive charts and live metrics to monitor creator performance and authenticity in real-time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EngagementChart />
            <ProfilePreview />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}