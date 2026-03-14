const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
<<<<<<< HEAD
  createdAt: { type: Date, default: Date.now },
  // track the most recent login timestamp
  lastLogin: { type: Date }
=======
  createdAt: { type: Date, default: Date.now }
>>>>>>> ca640d3ba53d0070f4220561d0d626d7b3cb0492
});

module.exports = mongoose.model('User', userSchema);