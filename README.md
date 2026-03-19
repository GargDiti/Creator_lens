# CreatorLens - Creator Analytics Platform

A comprehensive full-stack application for analyzing social media creators for fake followers, engagement rates, and authenticity using React + Node.js + Express.

## 📋 Features

### Core Analytics
- **Creator Profile Analyzer**: Input username and get detailed metrics
- **Engagement Rate Calculator**: Calculate (likes + comments) / followers * 100
- **Fake Follower Detection**: Detect suspicious followers based on engagement, spikes, inactivity
- **Audience Authenticity Score**: 0-100 score based on engagement and quality
- **Creator Analytics Report**: Followers, avg likes/comments, engagement rate, fake %, etc.
- **Growth Pattern Analysis**: Detect abnormal follower growth
- **Influencer Trust Score**: Weighted score based on engagement, authenticity, growth
- **Audience Insights**: Follower activity, interaction quality, comment frequency
- **AI Generated Report**: Human-readable summary of analytics
- **Creator Comparison Tool**: Compare two creators side by side
- **Saved Reports**: Store and access past analyses

### Dashboard UI
- **Professional SaaS-Style Dashboard**: Modern, responsive design with Sidebar & Navbar
- **Real-time Analytics**: Live metrics and charts using Recharts
- **Multi-page Application**: Dashboard, Analyzer, Comparison pages
- **Sign-in Page**: Secure authentication interface
- **Dark Mode Support**: Eye-friendly optional dark theme
- **Mobile Responsive**: Works on all devices and screen sizes

## 🏗️ Project Structure

```
fake_influencer/
├── index.js                    # Backend entry point
├── package.json               # Backend dependencies
├── .env                       # Environment configuration
├── routes/
│   ├── auth.js               # Authentication routes
│   └── analyze.js            # Analysis routes
├── models/
│   ├── User.js               # User model
│   └── Report.js             # Report model
├── middleware/
│   └── auth.js               # Authentication middleware
├── public/                   # Static HTML
└── client/                   # React Vite frontend
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── MetricCard.jsx
    │   │   ├── ChartPanel.jsx
    │   │   └── RecommendationPanel.jsx
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── AnalyzerPage.jsx
    │   │   └── ComparePage.jsx
    │   ├── services/
    │   │   └── api.js
    │   └── App.jsx
    ├── vite.config.js
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
# Install dependencies
npm install

# Configure environment (update .env if needed)
# MONGO_URI=mongodb://localhost:27017/fake_influencer
# JWT_SECRET=your_jwt_secret_here
# PORT=3000

# Start backend server
npm start
```

Backend runs on: `http://localhost:3000`

### Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 📡 API Endpoints

### Analysis
- `POST /api/analyze` - Analyze a creator
  - Body: `{ "username": "creator_handle" }`
  - Returns: Complete analysis with metrics, scores, and recommendations

- `GET /api/reports` - Get all saved reports
  - Returns: Array of previous analyses

### Comparison
- `POST /api/compare` - Compare two creators
  - Body: `{ "username1": "handle1", "username2": "handle2" }`
  - Returns: Side-by-side comparison of both creators

## 🎯 Usage

### Via Web Dashboard
1. Open `http://localhost:5173` in your browser
2. Sign in with any email/password (demo mode)
3. Use sidebar to navigate:
   - **Dashboard**: View overview and recent analyses
   - **Analyze**: Analyze a single creator
   - **Compare**: Compare two creators
4. Enter creator usernames and view comprehensive reports

### Via API
```bash
# Analyze a creator
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"username": "influencer_name"}'

# Compare creators
curl -X POST http://localhost:3000/api/compare \
  -H "Content-Type: application/json" \
  -d '{"username1": "creator1", "username2": "creator2"}'
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv for configuration
- **Data Storage**: In-memory (ready for MongoDB integration)

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: TailwindCSS 3.4
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🔐 Security Notes

- Authentication middleware ready for JWT implementation
- Environment variables for sensitive configuration
- CORS enabled and configurable
- Input validation on all API endpoints

## 📊 Analytics Metrics

### Core Metrics
- **Followers**: Total follower count
- **Engagement Rate**: (Likes + Comments) / Followers * 100
- **Fake Follower %**: Percentage of suspicious followers (0-100)
- **Authenticity Score**: Quality rating (0-100)
- **Trust Score**: Overall reliability score (0-100)

### Advanced Metrics
- **Growth Pattern Analysis**: Detects abnormal growth spikes
- **Audience Activity**: Follower engagement levels
- **Interaction Quality**: Comment and engagement authenticity
- **AI Report**: Natural language summary of findings

## 🎨 UI Features

### Dashboard Components
- **Metric Cards**: Beautiful cards with trend indicators (📈/📉)
- **Charts**: 
  - Line charts for trends
  - Bar charts for comparisons
  - Pie charts for distribution
- **Recommendation Panel**: AI-generated actionable insights
- **Growth Status**: Visual indicator of follower growth patterns

### Responsive Design
- Desktop: Full layout with sidebar
- Tablet: Optimized column layout
- Mobile: Single column responsive design

## 🚀 Deployment

### Build Frontend
```bash
cd client
npm run build
```

### Production Frontend
```bash
cd client
npm run preview
```

## 📝 Sample Data

The application generates mock data for demonstrations:
- Random follower counts (1K-100K+)
- Simulated engagement metrics
- Generated fake follower percentages
- Synthesized growth patterns

For production use, integrate with real social media APIs (Instagram Graph API, Twitter API, etc.)

## 🔄 Future Enhancements

- Database persistence with MongoDB
- User authentication with JWT tokens
- Real social media API integration
- ML-based fake follower detection
- Export reports as pdf

