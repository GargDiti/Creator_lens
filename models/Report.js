const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
<<<<<<< HEAD
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true, index: true },
=======
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
>>>>>>> ca640d3ba53d0070f4220561d0d626d7b3cb0492
  followers: Number,
  avgLikes: Number,
  avgComments: Number,
  engagementRate: Number,
<<<<<<< HEAD
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
=======
  fakeFollowerPercentage: Number,
  authenticityScore: Number,
  trustScore: Number,
  recommendations: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
>>>>>>> ca640d3ba53d0070f4220561d0d626d7b3cb0492
