require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const analyzeRoutes = require('./routes/analyze');
const authRoutes = require('./routes/auth');

const app = express();
const clientDistPath = path.join(__dirname, 'client', 'dist');
const publicPath = path.join(__dirname, 'public');
const staticPath = fs.existsSync(clientDistPath) ? clientDistPath : publicPath;

app.use(cors());
app.use(express.json());
app.use(express.static(staticPath));

app.use('/api', analyzeRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  res.sendFile(path.join(staticPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;

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
