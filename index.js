require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
<<<<<<< HEAD
const mongoose = require('mongoose');

const analyzeRoutes = require('./routes/analyze');
const authRoutes = require('./routes/auth');
=======

const analyzeRoutes = require('./routes/analyze');
>>>>>>> ca640d3ba53d0070f4220561d0d626d7b3cb0492

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', analyzeRoutes);
<<<<<<< HEAD
app.use('/api/auth', authRoutes);
=======
>>>>>>> ca640d3ba53d0070f4220561d0d626d7b3cb0492

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
<<<<<<< HEAD

const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is missing in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
=======
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> ca640d3ba53d0070f4220561d0d626d7b3cb0492
