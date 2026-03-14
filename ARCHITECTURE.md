## 🏗️ CREATOR ANALYTICS PLATFORM - SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER BROWSER (Client)                         │
│                   http://localhost:5173                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                 │
        v                                 v
┌──────────────────────────────────────────────────────────────────┐
│              REACT + VITE FRONTEND (Port 5173)                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Pages:                          Components:                      │
│  ├─ LoginPage.jsx               ├─ Sidebar.jsx                   │
│  ├─ Dashboard.jsx               ├─ Navbar.jsx                    │
│  ├─ AnalyzerPage.jsx            ├─ MetricCard.jsx                │
│  └─ ComparePage.jsx             ├─ ChartPanel.jsx                │
│                                  └─ RecommendationPanel.jsx       │
│                                                                   │
│  Styling: TailwindCSS + Dark Mode                                │
│  Charts: Recharts (Bar, Line, Pie)                               │
│  Icons: Lucide React                                             │
│  Routing: React Router v7                                        │
│  HTTP Client: Axios                                              │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                    API Calls via
                    Axios + Proxy
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        v                                     v
┌──────────────────────────────────────────────────────────────────┐
│         EXPRESS API SERVER (Backend)                              │
│              http://localhost:3000                                │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Routes:                         Endpoints:                       │
│  ├─ routes/analyze.js           ├─ POST /api/analyze             │
│  └─ routes/auth.js              ├─ POST /api/compare             │
│                                  └─ GET /api/reports              │
│  Middleware:                                                      │
│  ├─ CORS enabled                                                 │
│  ├─ Body parser                                                  │
│  └─ Auth (JWT ready)                                             │
│                                                                   │
│  Analysis Functions:                                             │
│  ├─ fetchCreatorData()                                           │
│  ├─ calculateEngagementRate()                                    │
│  ├─ detectFakeFollowers()                                        │
│  ├─ calculateAuthenticityScore()                                 │
│  ├─ calculateTrustScore()                                        │
│  ├─ analyzeGrowthPattern()                                       │
│  ├─ getRecommendations()                                         │
│  └─ generateAIReport()                                           │
│                                                                   │
│  Data Storage: In-memory arrays (ready for MongoDB)              │
└──────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                    DATA FLOW DIAGRAM                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  User Input (Username)                                           │
│       │                                                           │
│       ├─> Analyzer Form ──POST─> /api/analyze                   │
│       │        │                      │                          │
│       │        │                      v                          │
│       │        │              Analysis Engine                    │
│       │        │                      │                          │
│       │        │                      ├─ Fetch Mock Data         │
│       │        │                      ├─ Calculate Metrics       │
│       │        │                      ├─ Detect Fakes           │
│       │        │                      ├─ Analyze Growth         │
│       │        │                      ├─ Generate Report        │
│       │        │                      └─ Get Recommendations    │
│       │        │                      │                          │
│       │        └─ Response JSON <─────┘                          │
│       │        │                                                  │
│       │        v                                                  │
│       │   Display Results                                         │
│       │   ├─ Metric Cards                                        │
│       │   ├─ Charts                                              │
│       │   └─ Recommendations                                     │
│       │                                                           │
│       └─> Comparison ──POST─> /api/compare                       │
│                │                    │                            │
│                │                    v                            │
│                │           Compare Two Creators                  │
│                │                    │                            │
│                └─ Response JSON <───┘                            │
│                │                                                  │
│                v                                                  │
│           Side-by-Side Comparison                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                  METRIC CALCULATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Raw Creator Data                                                │
│  ├─ followers: number                                            │
│  ├─ avgLikes: number                                             │
│  ├─ avgComments: number                                          │
│  └─ growthData: array                                            │
│        │                                                          │
│        ├─────────────────────────────┐                           │
│        │                             │                           │
│        v                             v                           │
│  Engagement Rate          Fake Follower Detection                │
│  = (likes + comments)     - If engagement < 1% &                 │
│    / followers * 100        followers > 10K                      │
│        │                   = HIGH FAKE                           │
│        │                     │                                   │
│        v                     v                                   │
│    Authenticity Score    Trust Score                             │
│    = 100 - fakePercent   = (engagement +                         │
│      - (100 - engagement)   authenticity) / 2                    │
│                            │                                     │
│                            v                                     │
│                   AI Report Generation                           │
│                   + Recommendations                              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│              COMPONENT HIERARCHY                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  App.jsx (Routing + Auth)                                        │
│  ├─ LoginPage                                                    │
│  │  └─ Form inputs + Logo                                       │
│  │                                                               │
│  ├─ Dashboard                                                    │
│  │  ├─ Sidebar                                                  │
│  │  ├─ Navbar                                                   │
│  │  ├─ MetricCard (x4)                                          │
│  │  └─ ChartPanel (x3)                                          │
│  │                                                               │
│  ├─ AnalyzerPage                                                │
│  │  ├─ Sidebar                                                  │
│  │  ├─ Navbar                                                   │
│  │  ├─ Form (username input)                                    │
│  │  ├─ MetricCard (x6)                                          │
│  │  ├─ ChartPanel (x2)                                          │
│  │  └─ RecommendationPanel                                      │
│  │                                                               │
│  └─ ComparePage                                                 │
│     ├─ Sidebar                                                  │
│     ├─ Navbar                                                   │
│     ├─ Form (x2 inputs)                                         │
│     └─ Comparison Cards (x2)                                    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│              API REQUEST/RESPONSE                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  POST /api/analyze                                               │
│  Request:                Response:                               │
│  {                       {                                       │
│    username: string        id: number                            │
│  }                         username: string                      │
│                            followers: number                     │
│                            avgLikes: number                      │
│                            avgComments: number                   │
│                            engagementRate: number                │
│                            fakeFollowerPercentage: number        │
│                            authenticityScore: number             │
│                            trustScore: number                    │
│                            recommendations: string[]             │
│                            aiReport: string                      │
│                            growthAnalysis: object                │
│                            audienceInsights: object              │
│                            createdAt: date                       │
│                          }                                       │
│                                                                   │
│  POST /api/compare                                               │
│  Request:                Response:                               │
│  {                       {                                       │
│    username1: string       creator1: {                           │
│    username2: string         username: string                    │
│  }                           engagementRate: number              │
│                              fakeFollowers: number               │
│                              authenticityScore: number           │
│                              trustScore: number                  │
│                            }                                     │
│                            creator2: { ... }                     │
│                          }                                       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│              TECH STACK SUMMARY                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  FRONTEND:                          BACKEND:                      │
│  ├─ React 19                        ├─ Express.js               │
│  ├─ Vite                            ├─ Node.js                  │
│  ├─ React Router v7                 ├─ Axios                    │
│  ├─ TailwindCSS 3.4                 ├─ CORS                     │
│  ├─ Recharts                        ├─ dotenv                   │
│  ├─ Lucide React                    │                           │
│  └─ Axios                           └─ In-memory store          │
│                                        (MongoDB ready)          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow Example

```
1. User enters "john_doe" in Analyzer
2. Clicks "Analyze Creator"
3. Frontend sends: POST /api/analyze { username: "john_doe" }
4. Backend receives request
5. generateMockData() creates random metrics
6. All calculations run:
   - Engagement = (likes + comments) / followers * 100
   - Fake detection logic
   - Authenticity score logic
   - AI report generation
7. Backend returns JSON response
8. Frontend updates state with result
9. Charts, cards, and recommendations render
10. User sees complete analysis dashboard
```

---

## 📊 State Management

```
Frontend State:
├─ isAuthenticated (global)
├─ currentReport (analyzer results)
├─ comparisonData (comparison results)
├─ loading (API call status)
└─ error (error messages)

Backend State:
├─ In-memory array: reports[]
├─ functions for all calculations
└─ ready for database integration
```

---

## 🔐 Security Architecture

```
Current:
├─ CORS enabled
├─ Input validation
└─ Error handling

Production Ready:
├─ JWT authentication
├─ Password hashing (bcryptjs)
├─ Rate limiting
├─ Database encryption
└─ HTTPS/SSL
```
