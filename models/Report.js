const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true, index: true },
  followers: Number,
  avgLikes: Number,
  avgComments: Number,
  engagementRate: Number,
  fakeFollowerScore: Number,
  fakeFollowerPercentage: Number,
  authenticityScore: Number,
  trustScore: Number,
  growthStatus: { type: String, default: 'Organic Growth' },
  engagementQuality: { type: String, default: 'High' },
  audienceActivityScore: Number,
  recommendations: [String],
  growthData: [Number],
  growthAnalysis: {
    abnormal: Boolean,
    spikeCount: Number,
    averageChange: Number
  },
  audienceInsights: {
    activityLevel: Number,
    interactionQuality: Number,
    commentFrequency: Number
  },
  aiReport: String
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('Report', reportSchema);
