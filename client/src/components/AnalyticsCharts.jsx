import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsCharts = ({ report }) => {
  const barData = {
    labels: ['Followers', 'Avg Likes', 'Avg Comments'],
    datasets: [
      {
        label: 'Metrics',
        data: [report.followers, report.avgLikes, report.avgComments],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  const doughnutData = {
    labels: ['Real Followers', 'Fake Followers'],
    datasets: [
      {
        data: [100 - report.fakeFollowerPercentage, report.fakeFollowerPercentage],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Analytics Charts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Metrics Overview</h3>
          <Bar data={barData} />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Follower Authenticity</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;