const express = require('express');
const Report = require('../models/Report');

const router = express.Router();

// Mock function to fetch creator data
const fetchCreatorData = (username) => {
  const normalizedUsername = username.replace(/^@+/, '').toLowerCase();
  const seed = normalizedUsername.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 101;
  const pseudoRandom = (offset = 0) => {
    const value = Math.sin(seed + offset) * 10000;
    return value - Math.floor(value);
  };

  const followers = Math.floor(5000 + pseudoRandom(1) * 1500000);
  const growthData = Array.from({ length: 12 }, (_, idx) => {
    const growthMultiplier = 0.92 + pseudoRandom(idx + 3) * 0.2;
    return Math.floor((followers * (idx + 1) / 12) * growthMultiplier);
  });

  const avgLikes = Math.floor(followers * (0.015 + pseudoRandom(20) * 0.08));
  const avgComments = Math.floor(avgLikes * (0.03 + pseudoRandom(21) * 0.08));

  return {
    followers,
    avgLikes,
    avgComments,
    posts: 50 + Math.floor(pseudoRandom(4) * 350),
    growthData,
    audienceActivity: Math.round(30 + pseudoRandom(5) * 70),
    interactionQuality: Math.round(25 + pseudoRandom(6) * 75),
    commentFrequency: Math.round(5 + pseudoRandom(7) * 40)
  };
};

// Calculate engagement rate
const calculateEngagementRate = (avgLikes, avgComments, followers) => {
  if (!followers) return 0;
  return ((avgLikes + avgComments) / followers) * 100;
};

// Detect fake followers (simple heuristic)
const detectFakeFollowers = (engagementRate, followers) => {
  if (engagementRate < 1.2 && followers > 10000) {
    return Math.min(52 + (followers / 100000), 88);
  }
  const baseSuspicion = 45 - engagementRate * 4.4;
  const followerPenalty = followers > 500000 ? 4 : 0;
  return Math.min(90, Math.max(2, baseSuspicion + followerPenalty));
};

// Authenticity score
const calculateAuthenticityScore = (engagementRate, fakePercentage) => {
  return Math.min(100, Math.max(0, 100 - fakePercentage + engagementRate * 1.4));
};

// Trust score
const calculateTrustScore = (engagementRate, authenticityScore) => {
  return Math.min(100, (engagementRate * 5 + authenticityScore * 2) / 7);
};

const getRecommendations = (engagementRate, fakePercentage, audienceActivity) => {
  const recommendations = [];

  if (fakePercentage >= 40) {
    recommendations.push('Audit follower sources and remove suspicious spikes from paid campaigns');
  }
  if (engagementRate < 2) {
    recommendations.push('Improve content hooks and post timing to increase meaningful engagement');
  }
  if (audienceActivity < 45) {
    recommendations.push('Use stories, polls, and Q&A to activate inactive followers');
  }
  if (!recommendations.length) {
    recommendations.push('Maintain current growth strategy and monitor quality monthly');
  }

  return recommendations;
};

const analyzeGrowthPattern = (growthData) => {
  if (!Array.isArray(growthData) || growthData.length < 2) {
    return { abnormal: false, spikeCount: 0, averageChange: 0 };
  }

  const changes = growthData.slice(1).map((value, index) => {
    const prev = growthData[index];
    if (!prev) return 0;
    return ((value - prev) / prev) * 100;
  });

  const avgChange = changes.reduce((acc, value) => acc + value, 0) / changes.length;
  const spikeCount = changes.filter((value) => Math.abs(value - avgChange) > 10).length;

  return {
    abnormal: spikeCount >= 3,
    spikeCount,
    averageChange: Number(avgChange.toFixed(2))
  };
};

// AI Generated Report
const generateAIReport = (data) => {
  return `Creator ${data.username} has ${data.followers} followers and ${data.engagementRate.toFixed(2)}% engagement. Fake followers are estimated at ${data.fakeFollowerPercentage.toFixed(2)}%, with authenticity at ${data.authenticityScore.toFixed(2)} and trust at ${data.trustScore.toFixed(2)}. Growth looks ${data.growthAnalysis.abnormal ? 'spiky' : 'steady'} and audience activity is ${data.audienceInsights.activityLevel > 50 ? 'healthy' : 'weak'}. Recommendations: ${data.recommendations.join('; ')}.`;
};

// Analyze creator
router.post('/analyze', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username || !username.trim()) {
      return res.status(400).send({ error: 'Username is required' });
    }

    const cleanedUsername = username.trim().replace(/^@+/, '');
    const data = fetchCreatorData(username);
    const engagementRate = calculateEngagementRate(data.avgLikes, data.avgComments, data.followers);
    const fakePercentage = detectFakeFollowers(engagementRate, data.followers);
    const authenticityScore = calculateAuthenticityScore(engagementRate, fakePercentage);
    const trustScore = calculateTrustScore(engagementRate, authenticityScore);
    const recommendations = getRecommendations(engagementRate, fakePercentage, data.audienceActivity);
    const growthAnalysis = analyzeGrowthPattern(data.growthData);

    // Determine growth status and engagement quality
    const growthStatus = growthAnalysis.abnormal ? 'Suspicious Spike' : 'Organic Growth';
    const engagementQuality = engagementRate >= 10 ? 'High' : engagementRate >= 5 ? 'Medium' : 'Low';
    const audienceActivityScore = Math.round((data.audienceActivity + data.interactionQuality + data.commentFrequency) / 3);

    const aiReport = generateAIReport({
      username: cleanedUsername,
      followers: data.followers,
      engagementRate,
      fakeFollowerPercentage: fakePercentage,
      authenticityScore,
      trustScore,
      growthAnalysis,
      audienceInsights: { activityLevel: data.audienceActivity },
      recommendations
    });

    const report = new Report({
      username: cleanedUsername,
      followers: data.followers,
      avgLikes: data.avgLikes,
      avgComments: data.avgComments,
      engagementRate,
      fakeFollowerScore: fakePercentage,
      fakeFollowerPercentage: fakePercentage,
      authenticityScore,
      trustScore,
      growthStatus,
      engagementQuality,
      audienceActivityScore,
      recommendations,
      growthData: data.growthData,
      growthAnalysis,
      audienceInsights: {
        activityLevel: data.audienceActivity,
        interactionQuality: data.interactionQuality,
        commentFrequency: data.commentFrequency
      },
      aiReport
    });

    await report.save();
    res.send(report);
  } catch (e) {
    res.status(500).send({ error: 'Failed to analyze creator' });
  }
});

// Get reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }).limit(100);
    res.send(reports);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Compare two creators
router.post('/compare', async (req, res) => {
  try {
    const { username1, username2 } = req.body;
    const data1 = fetchCreatorData(username1);
    const data2 = fetchCreatorData(username2);

    const eng1 = calculateEngagementRate(data1.avgLikes, data1.avgComments, data1.followers);
    const eng2 = calculateEngagementRate(data2.avgLikes, data2.avgComments, data2.followers);

    const fake1 = detectFakeFollowers(eng1, data1.followers);
    const fake2 = detectFakeFollowers(eng2, data2.followers);

    const auth1 = calculateAuthenticityScore(eng1, fake1);
    const auth2 = calculateAuthenticityScore(eng2, fake2);

    const trust1 = calculateTrustScore(eng1, auth1);
    const trust2 = calculateTrustScore(eng2, auth2);

    res.send({
      creator1: {
        username: username1,
        followers: data1.followers,
        engagementRate: eng1,
        fakeFollowerPercentage: fake1,
        authenticityScore: auth1,
        trustScore: trust1
      },
      creator2: {
        username: username2,
        followers: data2.followers,
        engagementRate: eng2,
        fakeFollowerPercentage: fake2,
        authenticityScore: auth2,
        trustScore: trust2
      },
      betterMatch: auth1 >= auth2 ? 'creator1' : 'creator2'
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
