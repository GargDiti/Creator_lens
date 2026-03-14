const mongoose = require('mongoose');
require('dotenv').config();
(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fake_influencer');
  const User = require('./models/User');
  const user = await User.findOne({ email: 'admin@creatorlens.com' });
  console.log('before', user);
  user.lastLogin = new Date();
  await user.save();
  const updated = await User.findOne({ email: 'admin@creatorlens.com' }).lean();
  console.log('after', updated);
  mongoose.disconnect();
})();