import React, { useState } from 'react';

const ComparisonTool = ({ onCompare }) => {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username1.trim() && username2.trim()) {
      onCompare(username1, username2);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Compare Creators</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="username1" className="block text-sm font-medium text-gray-700 mb-2">
              Creator 1
            </label>
            <input
              type="text"
              id="username1"
              value={username1}
              onChange={(e) => setUsername1(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label htmlFor="username2" className="block text-sm font-medium text-gray-700 mb-2">
              Creator 2
            </label>
            <input
              type="text"
              id="username2"
              value={username2}
              onChange={(e) => setUsername2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Compare Creators
        </button>
      </form>
    </div>
  );
};

export default ComparisonTool;