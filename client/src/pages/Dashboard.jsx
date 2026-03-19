import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import MetricCard from '../components/MetricCard'
import ChartPanel from '../components/ChartPanel'
import { Users, TrendingUp, AlertTriangle, Shield, Award, Activity, BarChart3, PieChart, Clock } from 'lucide-react'
import { getReports } from '../services/api'

export default function Dashboard({ onLogout }) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    avgEngagement: 0,
    avgFakeFollowers: 0,
    avgAuthenticityScore: 0,
    avgTrustScore: 0,
  })

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await getReports()
      setReports(response.data || [])

      // Calculate stats from reports
      if (response.data && response.data.length > 0) {
        const totalAnalyses = response.data.length
        const avgEngagement = response.data.reduce((sum, r) => sum + r.engagementRate, 0) / totalAnalyses
        const avgFakeFollowers = response.data.reduce((sum, r) => sum + r.fakeFollowerScore, 0) / totalAnalyses
        const avgAuthenticityScore = response.data.reduce((sum, r) => sum + r.authenticityScore, 0) / totalAnalyses
        const avgTrustScore = response.data.reduce((sum, r) => sum + r.trustScore, 0) / totalAnalyses

        setStats({
          totalAnalyses,
          avgEngagement: avgEngagement.toFixed(1),
          avgFakeFollowers: avgFakeFollowers.toFixed(1),
          avgAuthenticityScore: avgAuthenticityScore.toFixed(1),
          avgTrustScore: avgTrustScore.toFixed(1),
        })
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error)
    } finally {
      setLoading(false)
    }
  }

  // Prepare chart data
  const growthTrendData = reports.slice(0, 10).map((report, index) => ({
    name: report.username.substring(0, 8),
    engagement: report.engagementRate,
    followers: report.followers / 1000, // Convert to K
  }))

  const fakeFollowerDistribution = [
    { name: 'Real Followers', value: 100 - (stats.avgFakeFollowers || 0), color: '#10B981' },
    { name: 'Inactive/Bot', value: (stats.avgFakeFollowers || 0) * 0.7, color: '#F59E0B' },
    { name: 'Fake Accounts', value: (stats.avgFakeFollowers || 0) * 0.3, color: '#EF4444' },
  ]

  const audienceQualityScore = stats.avgAuthenticityScore || 0

  if (loading) {
    return (
      <div className="flex h-screen cosmic-bg">
        <Sidebar onLogout={onLogout} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-400 mx-auto"></div>
              <p className="mt-4 text-white/80">Loading dashboard...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen cosmic-bg">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-fuchsia-300 via-indigo-200 to-sky-200 bg-clip-text text-transparent">Dashboard</h2>
              <p className="text-white/80 mt-1">
                Analytics overview from {stats.totalAnalyses} creator analyses
              </p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Analyses"
                value={stats.totalAnalyses}
                change={12}
                icon={BarChart3}
              />
              <MetricCard
                title="Engagement Rate"
                value={parseFloat(stats.avgEngagement)}
                unit="%"
                change={5}
                icon={Activity}
              />
              <MetricCard
                title="Fake Followers %"
                value={parseFloat(stats.avgFakeFollowers)}
                unit="%"
                change={-8}
                icon={AlertTriangle}
              />
              <MetricCard
                title="Authenticity Score"
                value={parseFloat(stats.avgAuthenticityScore)}
                unit="/100"
                change={8}
                icon={Shield}
              />
              <MetricCard
                title="Trust Score"
                value={parseFloat(stats.avgTrustScore)}
                unit="/100"
                change={6}
                icon={Award}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Creator Growth Trend Chart */}
              <ChartPanel
                title="Creator Engagement Trends"
                type="line"
                data={growthTrendData}
                dataKey="engagement"
                xAxisKey="name"
              />

              {/* Fake Follower Distribution */}
              <ChartPanel
                title="Average Fake Follower Distribution"
                type="pie"
                data={fakeFollowerDistribution}
              />
            </div>

            {/* Audience Quality & Recent Analyses */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Audience Quality Indicator */}
              <div className="glass-panel rounded-xl border border-white/20 p-6 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-fuchsia-400" />
                  Audience Quality Indicator
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-white/80 mb-2">
                      <span>Authenticity Score</span>
                      <span>{audienceQualityScore}/100</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-400 h-3 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(147,51,234,0.5)]"
                        style={{ width: `${audienceQualityScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 glass-panel rounded-lg border border-green-400/30">
                      <div className="text-2xl font-bold text-green-400">
                        {Math.round(100 - parseFloat(stats.avgFakeFollowers || 0))}%
                      </div>
                      <div className="text-xs text-green-400/80">Real Followers</div>
                    </div>
                    <div className="p-3 glass-panel rounded-lg border border-red-400/30">
                      <div className="text-2xl font-bold text-red-400">
                        {stats.avgFakeFollowers}%
                      </div>
                      <div className="text-xs text-red-400/80">Fake Followers</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Creator Analyses */}
              <div className="lg:col-span-2 glass-panel rounded-xl border border-white/20 p-6 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  Recent Creator Analyses
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 px-2 text-white/80">Creator</th>
                        <th className="text-center py-3 px-2 text-white/80">Followers</th>
                        <th className="text-center py-3 px-2 text-white/80">Engagement</th>
                        <th className="text-center py-3 px-2 text-white/80">Authenticity</th>
                        <th className="text-center py-3 px-2 text-white/80">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.slice(0, 8).map((report, idx) => (
                        <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-sky-400 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                                {report.username.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-white">@{report.username}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center text-white/80">
                            {report.followers > 999999 ? (report.followers / 1000000).toFixed(1) + 'M' :
                             report.followers > 999 ? (report.followers / 1000).toFixed(1) + 'K' : report.followers}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              report.engagementRate >= 10 ? 'bg-green-500/20 text-green-300 border border-green-400/50' :
                              report.engagementRate >= 5 ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/50' :
                              'bg-red-500/20 text-red-300 border border-red-400/50'
                            }`}>
                              {report.engagementRate.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              report.authenticityScore >= 90 ? 'bg-green-500/20 text-green-300 border border-green-400/50' :
                              report.authenticityScore >= 70 ? 'bg-blue-500/20 text-blue-300 border border-blue-400/50' :
                              'bg-yellow-500/20 text-yellow-300 border border-yellow-400/50'
                            }`}>
                              {report.authenticityScore}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              report.growthStatus === 'Organic Growth' ? 'bg-green-500/20 text-green-300 border border-green-400/50' :
                              'bg-red-500/20 text-red-300 border border-red-400/50'
                            }`}>
                              {report.growthStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {reports.length === 0 && (
                  <div className="text-center py-8 text-white/60">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No analyses yet. Start by analyzing a creator!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
