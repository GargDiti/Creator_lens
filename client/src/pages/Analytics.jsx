import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react'
import Footer from '../components/Footer'

export default function Analytics() {
  const mockData = {
    totalAnalyses: 1240,
    avgAuthenticityScore: 78,
    totalCreatorsAnalyzed: 450,
    averageEngagement: 4.1,
  }

  return (
    <div className="min-h-screen text-white cosmic-bg">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.35),transparent_55%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <h1 className="text-5xl font-bold mb-6">Analytics Dashboard</h1>
          <p className="text-xl text-white/80">
            Comprehensive insights into influencer authenticity and engagement metrics.
          </p>
        </motion.div>
      </section>

      {/* Metrics Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, label: 'Total Analyses', value: mockData.totalAnalyses, gradient: 'from-fuchsia-500 via-indigo-400 to-sky-400' },
              { icon: TrendingUp, label: 'Avg Authenticity', value: `${mockData.avgAuthenticityScore}%`, gradient: 'from-emerald-400 via-cyan-400 to-sky-600' },
              { icon: Users, label: 'Creators Analyzed', value: mockData.totalCreatorsAnalyzed, gradient: 'from-amber-400 via-red-400 to-pink-500' },
              { icon: Zap, label: 'Avg Engagement', value: `${mockData.averageEngagement}%`, gradient: 'from-rose-500 via-pink-500 to-purple-500' },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              >
                <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${metric.gradient} opacity-40 blur-2xl`} />
                <div className="relative z-10">
                  <metric.icon className="w-8 h-8 text-white mb-2" />
                  <div className="text-white/60 text-sm mb-1">{metric.label}</div>
                  <div className="text-3xl font-bold text-white">{metric.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Authenticity Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500 via-indigo-400 to-sky-400 opacity-40 blur-2xl" />
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-white mb-6">Authenticity Score Distribution</h3>
              <div className="space-y-4">
                {[
                  { label: 'Highly Authentic (80-100%)', value: 45, color: 'from-emerald-400 to-green-500' },
                  { label: 'Moderate (60-79%)', value: 35, color: 'from-blue-400 to-indigo-500' },
                  { label: 'Low (40-59%)', value: 15, color: 'from-yellow-400 to-orange-500' },
                  { label: 'Very Low (<40%)', value: 5, color: 'from-red-400 to-pink-500' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">{item.label}</span>
                      <span className="font-semibold text-white">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Engagement Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-sky-600 opacity-40 blur-2xl" />
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-white mb-6">Engagement Trend</h3>
              <div className="flex items-end justify-center gap-2 h-48">
                {[40, 45, 38, 52, 48, 61, 55, 68, 62, 75, 70, 82].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-fuchsia-500 via-indigo-500 to-sky-400 rounded-t hover:opacity-70 transition cursor-pointer"
                  ></motion.div>
                ))}
              </div>
              <div className="text-center text-xs text-white/60 mt-4">Last 12 Months</div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
