const mongoose = require('mongoose');
require('dotenv').config();
(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fake_influencer');
  const User = require('./models/User');
  const u = await User.findOne({email:'admin@creatorlens.com'}).lean();
  console.log(u);
  mongoose.disconnect();
})();
