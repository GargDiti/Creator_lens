import React from 'react'
import { TrendingUp, TrendingDown, Users, Target, Shield, Award, Activity, AlertTriangle, CheckCircle } from 'lucide-react'

const getMetricConfig = (title) => {
  const configs = {
    'Followers': {
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-600 dark:text-blue-400',
      icon: Users
    },
    'Engagement Rate': {
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-600 dark:text-green-400',
      icon: Activity
    },
    'Fake Followers %': {
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-600 dark:text-red-400',
      icon: AlertTriangle
    },
    'Authenticity Score': {
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-600 dark:text-blue-400',
      icon: Shield
    },
    'Trust Score': {
      color: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-600 dark:text-purple-400',
      icon: Award
    }
  }
  return configs[title] || configs['Followers']
}

const getStatusBadge = (title, value) => {
  if (title === 'Engagement Rate') {
    if (value >= 10) return { text: 'High Engagement', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' }
    if (value >= 5) return { text: 'Medium Engagement', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' }
    return { text: 'Low Engagement', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' }
  }
  if (title === 'Fake Followers %') {
    if (value >= 20) return { text: 'Suspicious Audience', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' }
    if (value >= 10) return { text: 'Needs Attention', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' }
    return { text: 'Clean Audience', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' }
  }
  if (title === 'Authenticity Score' || title === 'Trust Score') {
    if (value >= 90) return { text: 'Trusted Creator', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' }
    if (value >= 70) return { text: 'Good Standing', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' }
    return { text: 'Needs Improvement', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' }
  }
  return null
}

export default function MetricCard({ icon: Icon, title, value, change, unit = '' }) {
  const config = getMetricConfig(title)
  const statusBadge = getStatusBadge(title, value)
  const isPositive = change >= 0

  return (
    <div className={`${config.bgColor} ${config.borderColor} rounded-xl border p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            {statusBadge && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                {statusBadge.text}
              </span>
            )}
          </div>

          <p className="text-3xl font-bold text-gray-900 dark:text-white flex items-baseline gap-2">
            {typeof value === 'number' && value > 999999 ? (value / 1000000).toFixed(1) + 'M' :
             typeof value === 'number' && value > 999 ? (value / 1000).toFixed(1) + 'k' : value}
            {unit && <span className="text-lg text-gray-500 dark:text-gray-400">{unit}</span>}
          </p>

          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-3 text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{Math.abs(change)}%</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
            </div>
          )}
        </div>

        <div className={`w-14 h-14 rounded-xl ${config.bgColor} border ${config.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          {Icon ? (
            <Icon className={`w-7 h-7 ${config.textColor}`} />
          ) : (
            <config.icon className={`w-7 h-7 ${config.textColor}`} />
          )}
        </div>
      </div>

      {/* Progress bar for scores */}
      {(title.includes('Score') || title.includes('Rate')) && typeof value === 'number' && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${config.color === 'green' ? 'bg-green-500' : config.color === 'red' ? 'bg-red-500' : config.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'}`}
              style={{ width: `${Math.min(100, value)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0</span>
            <span>{value.toFixed(1)}{unit}</span>
            <span>100{unit}</span>
          </div>
        </div>
      )}
    </div>
  )
}
