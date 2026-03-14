## 🚀 QUICK REFERENCE - RUN YOUR APP IN 30 SECONDS

### THREE SIMPLE COMMANDS

**Terminal 1 - Start Backend**
```bash
cd C:\Users\GARG\Desktop\projects\fake_influencer
npm start
```
✓ Runs on http://localhost:3000

**Terminal 2 - Start Frontend**
```bash
cd C:\Users\GARG\Desktop\projects\fake_influencer\client
npm run dev
```
✓ Runs on http://localhost:5173

**Browser**
```
Open: http://localhost:5173
Sign in: any email + password
```

---

## 📱 WHAT YOU'LL SEE

### 1. Login Page
- Email & password inputs
- Enter any credentials for demo

### 2. Dashboard
- 4 metric cards at top
- 3 charts
- Recent analyses list

### 3. Analyzer
- Enter username
- See full report with 6 metrics
- View AI recommendations

### 4. Compare
- Enter 2 usernames
- See side-by-side comparison
- All metrics compared

---

## 🎯 DEMO USERNAMES TO TRY
Just enter any of these (or make up your own!):
- john_doe
- influencer_jane
- creator_mike
- sarah_content
- tech_guru

---

## 📊 FILES STRUCTURE

```
Backend (Port 3000):
  ├─ index.js → Express server
  └─ routes/analyze.js → All API logic

Frontend (Port 5173):
  ├─ src/App.jsx → Routing
  ├─ src/pages/ → 4 pages
  └─ src/components/ → 5 components
```

---

## ✨ KEY FEATURES

✅ Sign-in page with modern design
✅ Professional dashboard with KPIs
✅ Creator analyzer with full metrics
✅ Creator comparison tool
✅ AI-powered recommendations
✅ Interactive charts
✅ Dark mode support
✅ Fully responsive design
✅ Real-time metrics calculation
✅ Beautiful UI with gradients

---

## 🔧 TROUBLESHOOTING

**Port already in use?**
```bash
# Change frontend port in vite.config.js
# Change backend port in .env
```

**npm packages missing?**
```bash
npm install
cd client && npm install
```

**Frontend not connecting to backend?**
Check vite.config.js has correct proxy settings

**Styles not loading?**
```bash
cd client && npm install tailwindcss
```

---

## 📖 DOCUMENTATION

- README.md → Full overview
- SETUP_GUIDE.md → Detailed setup
- ARCHITECTURE.md → System design
- PROJECT_SUMMARY.md → Complete features

---

## 🎨 COLORS & THEME

- Primary: Blue (#3b82f6)
- Secondary: Purple (#8b5cf6)
- Light Mode: White/Gray
- Dark Mode: Gray-900/Gray-800
- Accents: Red, Green, Yellow

---

## 🔑 ENVIRONMENT VARS (.env)

```
MONGO_URI=mongodb://localhost:27017/fake_influencer
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

---

## 📊 API ENDPOINTS REFERENCE

```
POST /api/analyze
Request: { username: "john_doe" }
Response: { metrics, scores, recommendations }

POST /api/compare
Request: { username1: "user1", username2: "user2" }
Response: { creator1: {...}, creator2: {...} }

GET /api/reports
Response: [{ ...report1 }, { ...report2 }]
```

---

## ⚡ PERFORMANCE TIPS

- Clear browser cache if styles don't update
- Restart servers after package.json changes
- Use Ctrl+C to stop each server
- Both terminals can run simultaneously
- Check console for error details

---

## 🎓 TECH USED

Backend: Node.js, Express, Axios, CORS, dotenv
Frontend: React 19, Vite, React Router, TailwindCSS, Recharts, Lucide Icons

---

## 📞 QUICK LINKS

Files to Know:
- React Entry: `/client/src/main.jsx`
- App Router: `/client/src/App.jsx`
- Styling: `/client/src/index.css`
- API Calls: `/client/src/services/api.js`
- Backend: `/index.js`

---

## ✅ CHECKLIST BEFORE RUNNING

- [ ] Node.js installed (v16+)
- [ ] npm works (`npm -v`)
- [ ] Backend dir ready
- [ ] Client dir ready
- [ ] .env file exists
- [ ] Ports 3000 & 5173 free
- [ ] Two terminal tabs open

---

**Ready to go! Start both servers and enjoy! 🎉**
