import React from 'react';

const ResultsCard = ({ report }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Results for {report.username}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Followers</p>
          <p className="text-2xl font-bold">{report.followers.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg Likes</p>
          <p className="text-2xl font-bold">{report.avgLikes}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg Comments</p>
          <p className="text-2xl font-bold">{report.avgComments}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Engagement Rate</p>
          <p className="text-2xl font-bold">{report.engagementRate.toFixed(2)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Fake Followers %</p>
          <p className="text-2xl font-bold text-red-500">{report.fakeFollowerPercentage.toFixed(2)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Authenticity Score</p>
          <p className="text-2xl font-bold">{report.authenticityScore.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Trust Score</p>
          <p className="text-2xl font-bold">{report.trustScore.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Growth Pattern</p>
          <p className="text-2xl font-bold">{report.growthAnalysis.abnormal ? 'Abnormal' : 'Normal'}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;