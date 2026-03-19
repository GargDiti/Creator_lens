import React from 'react'
import { CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react'

export default function RecommendationPanel({ recommendations = [], aiReport = '' }) {
  if (!recommendations || recommendations.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Generated Report</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{aiReport}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Recommendations
        </h3>
        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-800 dark:text-gray-300">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
