const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

// Define Report schema inline if not exists
const reportSchema = new mongoose.Schema({
  username: { type: String, required: true },
  followers: { type: Number, default: 0 },
  avgLikes: { type: Number, default: 0 },
  avgComments: { type: Number, default: 0 },
  engagementRate: { type: Number, default: 0 },
  fakeFollowerScore: { type: Number, default: 0 },
  authenticityScore: { type: Number, default: 0 },
  trustScore: { type: Number, default: 0 },
  growthStatus: { type: String, default: 'Organic Growth' },
  engagementQuality: { type: String, default: 'High' },
  audienceActivityScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', reportSchema);

const sampleUsers = [
  {
    username: 'admin',
    email: 'admin@creatorlens.com',
    password: 'Admin@123'
  },
  {
    username: 'demo',
    email: 'demo@creatorlens.com',
    password: 'Demo@123'
  }
];

const sampleReports = [
  {
    username: 'mrbeast',
    followers: 245000000,
    avgLikes: 45000000,
    avgComments: 2500000,
    engagementRate: 19.4,
    fakeFollowerScore: 2.3,
    authenticityScore: 98,
    trustScore: 97,
    growthStatus: 'Organic Growth',
    engagementQuality: 'High',
    audienceActivityScore: 95
  },
  {
    username: 'loganpaul',
    followers: 28000000,
    avgLikes: 2800000,
    avgComments: 450000,
    engagementRate: 11.5,
    fakeFollowerScore: 8.7,
    authenticityScore: 82,
    trustScore: 79,
    growthStatus: 'Organic Growth',
    engagementQuality: 'Medium',
    audienceActivityScore: 78
  },
  {
    username: 'emma_chamberlain',
    followers: 32000000,
    avgLikes: 3200000,
    avgComments: 580000,
    engagementRate: 11.8,
    fakeFollowerScore: 5.2,
    authenticityScore: 91,
    trustScore: 89,
    growthStatus: 'Organic Growth',
    engagementQuality: 'High',
    audienceActivityScore: 88
  },
  {
    username: 'techreviewer',
    followers: 8500000,
    avgLikes: 425000,
    avgComments: 85000,
    engagementRate: 6.0,
    fakeFollowerScore: 3.8,
    authenticityScore: 94,
    trustScore: 92,
    growthStatus: 'Organic Growth',
    engagementQuality: 'High',
    audienceActivityScore: 91
  },
  {
    username: 'fitnessguru',
    followers: 5200000,
    avgLikes: 312000,
    avgComments: 52000,
    engagementRate: 7.0,
    fakeFollowerScore: 12.5,
    authenticityScore: 76,
    trustScore: 72,
    growthStatus: 'Suspicious Spike',
    engagementQuality: 'Medium',
    audienceActivityScore: 68
  },
  {
    username: 'fashion_icon',
    followers: 18500000,
    avgLikes: 1665000,
    avgComments: 234000,
    engagementRate: 10.3,
    fakeFollowerScore: 4.1,
    authenticityScore: 93,
    trustScore: 91,
    growthStatus: 'Organic Growth',
    engagementQuality: 'High',
    audienceActivityScore: 89
  },
  {
    username: 'musicstar',
    followers: 42000000,
    avgLikes: 5880000,
    avgComments: 840000,
    engagementRate: 16.8,
    fakeFollowerScore: 6.7,
    authenticityScore: 88,
    trustScore: 85,
    growthStatus: 'Organic Growth',
    engagementQuality: 'High',
    audienceActivityScore: 85
  }
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is missing in environment variables');
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Report.deleteMany({});
    console.log('✅ Existing data cleared');

    // Seed users
    console.log('👥 Seeding users...');
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 8)
      }))
    );
    await User.insertMany(hashedUsers);
    console.log(`✅ ${hashedUsers.length} users created`);

    // Seed reports
    console.log('📊 Seeding creator reports...');
    await Report.insertMany(sampleReports);
    console.log(`✅ ${sampleReports.length} creator reports created`);

    // Log sample credentials
    console.log('\n' + '='.repeat(60));
    console.log('🎉 DATABASE SEEDED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n📝 Sample User Credentials:');
    console.log('   Email: admin@creatorlens.com | Password: Admin@123');
    console.log('   Email: demo@creatorlens.com  | Password: Demo@123');
    console.log('\n👤 Sample Creators in Database:');
    sampleReports.forEach(report => {
      console.log(`   • ${report.username} - ${report.followers.toLocaleString()} followers`);
    });
    console.log('\n' + '='.repeat(60));

    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
