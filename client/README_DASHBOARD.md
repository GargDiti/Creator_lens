# CreatorLens - Creator Analytics Platform

A modern, professional dashboard for analyzing social media creators using React + Vite + TailwindCSS.

## 🚀 Features

### Authentication
- **Sign-in Page**: Modern login interface with email/password
- Session management for secure access

### Dashboard
- **Overview Metrics**: Total analyses, engagement rates, creators tracked, authenticity scores
- **Charts & Analytics**: Engagement trends, follower distribution, authenticity pie chart
- **Recent Activity**: Track recently analyzed creators

### Creator Analyzer
- **Single Creator Analysis**: Detailed metrics for any creator
- **Real-time Metrics**:
  - Followers count
  - Average engagement rate
  - Fake follower detection
  - Authenticity score
  - Trust score
- **Growth Analysis**: Detect abnormal follower growth patterns
- **AI Report**: AI-generated insights and recommendations

### Creator Comparison
- **Side-by-side Comparison**: Compare metrics between two creators
- **Metrics Compared**:
  - Engagement rate
  - Fake follower percentage
  - Authenticity score
  - Trust score

### UI Components
- **Modern Sidebar Navigation**: Easy access to all features
- **Top Navbar**: Search functionality and user profile
- **Metric Cards**: Beautiful card components with trending indicators
- **Charts**: Bar, line, and pie charts using Recharts
- **Recommendation Panel**: AI-generated insights

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: TailwindCSS 3.4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   ├── Navbar.jsx         # Top navigation bar
│   │   ├── MetricCard.jsx     # Metric display component
│   │   ├── ChartPanel.jsx     # Chart component
│   │   └── RecommendationPanel.jsx  # Recommendations display
│   ├── pages/
│   │   ├── LoginPage.jsx      # Authentication
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── AnalyzerPage.jsx   # Creator analyzer
│   │   └── ComparePage.jsx    # Creator comparison
│   ├── services/
│   │   └── api.js             # API client with Axios
│   ├── App.jsx                # Main app with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Backend running on port 3000

### Installation

```bash
cd client
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
npm run preview
```

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:3000`:

- `POST /api/analyze` - Analyze a creator
- `POST /api/compare` - Compare two creators
- `GET /api/reports` - Get saved reports

## 🎨 UI Design

- **Color Scheme**: Professional blue and purple gradients
- **Dark Mode**: Fully supported with automatic styling
- **Responsive**: Works on desktop, tablet, and mobile
- **Animations**: Smooth transitions and hover effects
- **Modern Components**: Rounded corners, card-based layout

## 📊 Demo Credentials

For the sign-in page:
- **Email**: Any valid email format
- **Password**: Any password (demo only)

## 🔑 Key Pages

### Login Page
- Email and password input
- Show/hide password toggle
- Gradient background styling

### Dashboard
- Welcome overview
- 4 main metric cards
- 7-day engagement chart
- Follower distribution by size
- Authenticity overview (pie chart)
- Recent analyses list

### Analyzer Page
- Creator username input
- Single creator analysis
- 6 metric cards
- Metrics and authenticity charts
- Trust score gauge
- Growth status
- AI report and recommendations

### Compare Page
- Two creator username inputs
- Side-by-side metric comparison
- Color-coded sections

## 🎯 Features Highlights

1. **Real-time Analysis**: Get instant creator metrics
2. **AI Insights**: Automated recommendations based on data
3. **Professional UI**: SaaS-style dashboard design
4. **Easy Navigation**: Intuitive sidebar and navbar
5. **Mobile Responsive**: Works on all devices
6. **Dark Mode Support**: Eye-friendly interface
7. **API Integration**: Seamless backend communication

## 📝 Notes

- This is a demo dashboard with mock data generation
- For production, replace mock data with real social media APIs
- Authentication should be properly implemented with JWT
- Database integration needed for persistent data storage

## 🤝 Support

For issues or questions, please contact the development team.
