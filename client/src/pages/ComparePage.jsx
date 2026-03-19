import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { compareCreators } from '../services/api'
import {
  Users, TrendingUp, AlertTriangle, Shield, Award, Loader, ArrowRight,
  Trophy, BarChart3, Target, Activity, CheckCircle, Star
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'

export default function ComparePage({ onLogout }) {
  const [username1, setUsername1] = useState('')
  const [username2, setUsername2] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCompare = async (e) => {
    e.preventDefault()
    if (!username1.trim() || !username2.trim()) {
      setError('Please enter both usernames')
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await compareCreators(username1, username2)
      setResult(response.data)
    } catch (err) {
      setError('Failed to compare creators. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getBetterCreator = (creator1, creator2) => {
    // Calculate composite score (weighted average)
    const score1 = (
      creator1.engagementRate * 0.3 +
      creator1.authenticityScore * 0.3 +
      creator1.trustScore * 0.3 +
      (100 - creator1.fakeFollowerPercentage) * 0.1
    )

    const score2 = (
      creator2.engagementRate * 0.3 +
      creator2.authenticityScore * 0.3 +
      creator2.trustScore * 0.3 +
      (100 - creator2.fakeFollowerPercentage) * 0.1
    )

    return score1 > score2 ? 'creator1' : 'creator2'
  }

  const prepareChartData = (creator1, creator2) => {
    return [
      {
        metric: 'Engagement Rate',
        [creator1.username]: creator1.engagementRate,
        [creator2.username]: creator2.engagementRate,
      },
      {
        metric: 'Authenticity Score',
        [creator1.username]: creator1.authenticityScore,
        [creator2.username]: creator2.authenticityScore,
      },
      {
        metric: 'Trust Score',
        [creator1.username]: creator1.trustScore,
        [creator2.username]: creator2.trustScore,
      },
      {
        metric: 'Real Followers %',
        [creator1.username]: 100 - creator1.fakeFollowerPercentage,
        [creator2.username]: 100 - creator2.fakeFollowerPercentage,
      },
    ]
  }

  const prepareRadarData = (creator1, creator2) => {
    return [
      { subject: 'Engagement', A: creator1.engagementRate, B: creator2.engagementRate, fullMark: 20 },
      { subject: 'Authenticity', A: creator1.authenticityScore, B: creator2.authenticityScore, fullMark: 100 },
      { subject: 'Trust', A: creator1.trustScore, B: creator2.trustScore, fullMark: 100 },
      { subject: 'Real Followers', A: 100 - creator1.fakeFollowerPercentage, B: 100 - creator2.fakeFollowerPercentage, fullMark: 100 },
    ]
  }

  const CreatorCard = ({ creator, isWinner, position }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: position * 0.1 }}
      className={`relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)] border-2 p-6 ${
        isWinner ? 'border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10' : 'border-white/15'
      }`}
    >
      {isWinner && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-400 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-[0_0_20px_rgba(147,51,234,0.5)]">
            <Trophy className="w-4 h-4" />
            BETTER CHOICE
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
          isWinner ? 'bg-gradient-to-br from-fuchsia-400 to-indigo-400' : 'bg-white/20'
        } shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
          <Users className={`w-8 h-8 ${isWinner ? 'text-white' : 'text-white/80'}`} />
        </div>
        <h3 className="text-xl font-bold text-white">@{creator.username}</h3>
        <p className="text-sm text-white/60">{position === 0 ? 'Creator 1' : 'Creator 2'}</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-300" />
            <span className="text-sm font-medium text-blue-200">Followers</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {creator.followers > 999999 ? (creator.followers / 1000000).toFixed(1) + 'M' :
             creator.followers > 999 ? (creator.followers / 1000).toFixed(1) + 'K' : creator.followers}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 p-4 rounded-xl border border-green-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-green-300" />
            <span className="text-sm font-medium text-green-200">Engagement Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">{creator.engagementRate.toFixed(1)}%</p>
        </div>

        <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 p-4 rounded-xl border border-red-400/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-300" />
            <span className="text-sm font-medium text-red-200">Fake Followers</span>
          </div>
          <p className="text-2xl font-bold text-white">{creator.fakeFollowerPercentage.toFixed(1)}%</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-blue-300" />
            <span className="text-sm font-medium text-blue-200">Authenticity Score</span>
          </div>
          <p className="text-2xl font-bold text-white">{creator.authenticityScore}/100</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 p-4 rounded-xl border border-purple-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-purple-300" />
            <span className="text-sm font-medium text-purple-200">Trust Score</span>
          </div>
          <p className="text-2xl font-bold text-white">{creator.trustScore}/100</p>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen text-white cosmic-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.35),transparent_55%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <h1 className="text-5xl font-bold mb-4">Creator Comparison</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Compare metrics and authenticity scores between two creators to make better partnership decisions.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 mb-12 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500 via-indigo-400 to-sky-400 opacity-40 blur-2xl" />
          <div className="relative z-10">
            <form onSubmit={handleCompare} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Creator 1 Username
                  </label>
                  <input
                    type="text"
                    value={username1}
                    onChange={(e) => setUsername1(e.target.value)}
                    placeholder="e.g., @creator1"
                    className="w-full px-4 py-3 border border-white/20 bg-white/10 text-white placeholder:text-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40 focus:border-fuchsia-300 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                  />
                </div>

                <div className="flex items-center justify-center pb-3">
                  <div className="flex items-center gap-2 text-white/60">
                    <ArrowRight className="w-5 h-5" />
                    <span className="text-sm font-medium">Compare</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Creator 2 Username
                  </label>
                  <input
                    type="text"
                    value={username2}
                    onChange={(e) => setUsername2(e.target.value)}
                    placeholder="e.g., @creator2"
                    className="w-full px-4 py-3 border border-white/20 bg-white/10 text-white placeholder:text-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40 focus:border-fuchsia-300 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/20 border border-red-400 rounded-lg">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-400 text-white font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing and Comparing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    Compare Creators
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Side by Side Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[result.creator1, result.creator2].map((creator, idx) => {
                const betterCreator = getBetterCreator(result.creator1, result.creator2)
                const isWinner = (idx === 0 && betterCreator === 'creator1') || (idx === 1 && betterCreator === 'creator2')

                return (
                  <CreatorCard
                    key={idx}
                    creator={creator}
                    isWinner={isWinner}
                    position={idx}
                  />
                )
              })}
            </div>

            {/* Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar Chart Comparison */}
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500 via-indigo-400 to-sky-400 opacity-40 blur-2xl" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-fuchsia-300" />
                    Metrics Comparison
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={prepareChartData(result.creator1, result.creator2)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="metric" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }} />
                        <Legend />
                        <Bar dataKey={result.creator1.username} fill="#6366f1" />
                        <Bar dataKey={result.creator2.username} fill="#c084fc" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-sky-600 opacity-40 blur-2xl" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-sky-300" />
                    Performance Overview
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={prepareRadarData(result.creator1, result.creator2)}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.7)" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="rgba(255,255,255,0.7)" />
                        <Radar
                          name={result.creator1.username}
                          dataKey="A"
                          stroke="#6366f1"
                          fill="#6366f1"
                          fillOpacity={0.3}
                        />
                        <Radar
                          name={result.creator2.username}
                          dataKey="B"
                          stroke="#c084fc"
                          fill="#c084fc"
                          fillOpacity={0.3}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Winner Announcement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-fuchsia-400/50 bg-gradient-to-r from-fuchsia-500/10 via-indigo-500/10 to-sky-400/10 p-8 text-center shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-sky-400 opacity-40 blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Trophy className="w-8 h-8 text-fuchsia-300" />
                  <h4 className="text-2xl font-bold text-white">Recommended Creator</h4>
                  <Trophy className="w-8 h-8 text-fuchsia-300" />
                </div>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-indigo-200 to-sky-200 mb-2">
                  @{getBetterCreator(result.creator1, result.creator2) === 'creator1' ? result.creator1.username : result.creator2.username}
                </p>
                <p className="text-white/70">
                  Based on engagement rate, authenticity score, trust score, and follower quality analysis
                </p>

                <div className="mt-6 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-fuchsia-500/20 border border-fuchsia-400/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-fuchsia-300" />
                    <span className="text-fuchsia-200 font-medium">Higher Authenticity</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-400/30 rounded-lg">
                    <Star className="w-5 h-5 text-indigo-300" />
                    <span className="text-indigo-200 font-medium">Better Engagement</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Empty State */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-[0_0_30px_rgba(99,102,241,0.25)]">
              <BarChart3 className="w-12 h-12 text-white/60" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Compare Two Creators</h3>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Enter two creator usernames above to get a comprehensive side-by-side comparison
              with detailed metrics, charts, and recommendations for your brand partnerships.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
