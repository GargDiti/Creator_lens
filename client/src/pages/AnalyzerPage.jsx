import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { analyzeCreator } from '../services/api'
import {
  Activity, Loader, Search, ShieldCheck, Sparkles, UserCircle2, Users,
  TrendingUp, AlertTriangle, Award, Heart, MessageCircle, BarChart3,
  CheckCircle, XCircle, Star, Target, Zap
} from 'lucide-react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const compact = (value) => Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value || 0)

const COLORS = ['#10B981', '#F59E0B', '#EF4444']

export default function AnalyzerPage() {
  const [username, setUsername] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async (event) => {
    event.preventDefault()
    if (!username.trim()) {
      setError('Please enter an Instagram username')
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await analyzeCreator(username.trim())
      setResult(response.data)
    } catch (_err) {
      setError('Unable to analyze this profile right now.')
    } finally {
      setLoading(false)
    }
  }

  const growthChartData = useMemo(() => {
    if (!result?.growthData?.length) return []
    return result.growthData.map((value, index) => ({
      month: `M${index + 1}`,
      followers: value,
    }))
  }, [result])

  const fakeFollowerChartData = useMemo(() => {
    if (!result) return []
    const realFollowers = 100 - result.fakeFollowerScore
    const fakeFollowers = result.fakeFollowerScore
    return [
      { name: 'Real Followers', value: realFollowers, color: '#10B981' },
      { name: 'Inactive/Bot', value: fakeFollowers * 0.7, color: '#F59E0B' },
      { name: 'Fake Accounts', value: fakeFollowers * 0.3, color: '#EF4444' },
    ]
  }, [result])

  const getRecommendations = (result) => {
    const recommendations = []

    if (result.fakeFollowerScore >= 40) {
      recommendations.push({
        type: 'danger',
        icon: AlertTriangle,
        title: 'High Fake Follower Risk',
        description: 'Audit follower sources and remove suspicious spikes from paid campaigns'
      })
    }

    if (result.engagementRate < 2) {
      recommendations.push({
        type: 'warning',
        icon: TrendingUp,
        title: 'Low Engagement',
        description: 'Improve content hooks and post timing to increase meaningful engagement'
      })
    }

    if (result.audienceActivityScore < 45) {
      recommendations.push({
        type: 'info',
        icon: Activity,
        title: 'Inactive Audience',
        description: 'Use stories, polls, and Q&A to activate inactive followers'
      })
    }

    if (result.authenticityScore >= 90 && result.engagementRate >= 5) {
      recommendations.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Excellent Profile',
        description: 'This creator shows strong authenticity and engagement. Suitable for brand partnerships.'
      })
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: 'success',
        icon: Star,
        title: 'Good Performance',
        description: 'Maintain current growth strategy and monitor quality monthly'
      })
    }

    return recommendations
  }

  const getStatusColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800'
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'danger': return 'bg-red-50 border-red-200 text-red-800'
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800'
      default: return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen cosmic-bg px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl md:p-7">
        {/* Search Form */}
        <form onSubmit={handleAnalyze} className="mb-6 flex flex-col gap-3 rounded-2xl bg-white/10 border border-white/15 p-4 md:flex-row md:items-center">
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter Instagram Username (e.g., @creatorname)"
            className="h-12 flex-1 rounded-xl border border-indigo-100 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none ring-indigo-400 transition focus:ring-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-12 min-w-32 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" /> Analyzing
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Search className="h-4 w-4" /> Analyze
              </span>
            )}
          </button>
        </form>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm text-red-600 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              {error}
            </p>
          </div>
        )}

        {!result && !loading && (
          <div className="rounded-2xl bg-white/85 px-6 py-12 text-center">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-indigo-600 opacity-50" />
            <h2 className="text-xl font-semibold text-indigo-900">Analyze a Creator Profile</h2>
            <p className="mt-2 text-sm text-slate-600">Enter a username above to get comprehensive analytics, metrics, and AI-powered recommendations.</p>
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Creator Profile Summary */}
            <div className="rounded-2xl bg-white/90 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                  <UserCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">@{result.username}</h2>
                  <p className="text-slate-600">Creator Profile Analysis</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.growthStatus === 'Organic Growth'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.growthStatus}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.engagementQuality === 'High'
                      ? 'bg-green-100 text-green-800'
                      : result.engagementQuality === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.engagementQuality} Quality
                  </span>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Followers</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">
                    {result.followers > 999999 ? (result.followers / 1000000).toFixed(1) + 'M' :
                     result.followers > 999 ? (result.followers / 1000).toFixed(1) + 'K' : result.followers}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Engagement Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{result.engagementRate.toFixed(1)}%</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Fake Followers</span>
                  </div>
                  <p className="text-2xl font-bold text-red-900">{result.fakeFollowerScore.toFixed(1)}%</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Authenticity</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{result.authenticityScore}/100</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Trust Score</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">{result.trustScore}/100</p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    <span className="text-sm font-medium text-pink-800">Avg Likes</span>
                  </div>
                  <p className="text-2xl font-bold text-pink-900">
                    {result.avgLikes > 999 ? (result.avgLikes / 1000).toFixed(1) + 'K' : result.avgLikes}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Avg Comments</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-900">
                    {result.avgComments > 999 ? (result.avgComments / 1000).toFixed(1) + 'K' : result.avgComments}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-800">Activity Score</span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-900">{result.audienceActivityScore}/100</p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Growth Trend Chart */}
              <div className="rounded-2xl bg-white/90 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  Follower Growth Trend
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthChartData}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" tickFormatter={compact} />
                      <Tooltip formatter={(value) => compact(value)} />
                      <Line
                        type="monotone"
                        dataKey="followers"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Fake Follower Distribution */}
              <div className="rounded-2xl bg-white/90 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Follower Quality Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={fakeFollowerChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {fakeFollowerChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="rounded-2xl bg-white/90 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI-Powered Recommendations
              </h3>

              <div className="space-y-4">
                {getRecommendations(result).map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${getStatusColor(rec.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <rec.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{rec.title}</h4>
                        <p className="text-sm opacity-90">{rec.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Report Summary */}
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  AI Analysis Summary
                </h4>
                <p className="text-sm text-slate-700">{result.aiReport}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
