# 🚀 PrepTracker

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Status](https://img.shields.io/badge/Status-Active-success)

## 📖 About
Full-stack MERN interview preparation platform with authentication, analytics, revision scheduling, and coding problem tracking.

---

## ✨ Key Features

- JWT Authentication
- Problem Tracking
- Analytics Dashboard
- Revision Center
- Smart Recommendations
- Progress Visualization
- Cloud Deployment

---

## 🌐 Live Demo

### Frontend (Vercel)

🔗 https://interview-prep-platform-project.vercel.app

The frontend is deployed on Vercel and automatically updates whenever changes are pushed to GitHub.

#### Environment Variable

VITE_API_URL=https://preptracker-api-iyr8.onrender.com

### Backend (Render)

🔗 https://preptracker-api-iyr8.onrender.com

The backend is deployed on Render and connected to MongoDB Atlas.

#### Required Environment Variables:

Frontend
- VITE_API_URL

Backend
- MONGO_URI
- JWT_SECRET

---

<!-- ## 🧪 Demo Account

Email: test@example.com
Password: 123456

> Feel free to explore all features using the demo account. -->

---

## 🖼️ Application Screenshots

### 🏠 Home Page

The landing page introduces PrepTracker and highlights its core capabilities.

![Landing Page](./screenshots/landing-page.png)

### 📊 Dashboard Overview

A centralized dashboard displaying progress metrics, achievements, streaks, and coding statistics.

![Dashboard](./screenshots/dashboard.png)

### 📝 Problem Tracking

Track coding problems, update status, search problems, and organize interview preparation efficiently.

![Problem Tracking](./screenshots/problem-tracking.png)

### 🎯 Recommended Problems

Personalized recommendations to encourage continuous learning.

<img width="1591" height="640" alt="image" src="https://github.com/user-attachments/assets/e05d083a-044f-4dfe-b992-a65ea8139171" />

### 📚 Revision Center

Review previously solved problems and maintain long-term retention through structured revision.

![Revision Center](./screenshots/revision-center.png)

### 📈 Analytics Page

Personalized analytics to improve and track performance.

![Analytics](./screenshots/analytics.png)

--- 

## 🎥 Demo Video
[Watch Demo] https://youtu.be/8R4NLIKPTWI

---

## 🚀 Deployment Workflow

### Frontend Deployment (Vercel)
1.Push changes to GitHub.
2.Vercel automatically detects new commits.
3.The application is rebuilt and deployed.
4.The latest version becomes available on the live URL.

### Backend Deployment (Render)
1.Push backend changes to GitHub.
2.The backend is rebuilt and redeployed.
3.API changes become available on the live backend URL.

> ⚠️ Note: This backend is hosted on Render’s free tier.  
> It may take **20–30 seconds to respond after inactivity** because the server goes to sleep.  
> The first request after inactivity may be slow (cold start), but subsequent requests are fast.

---

## 🎯 Project Goals

PrepTracker was built to help developers organize interview preparation through structured problem tracking, analytics, and revision scheduling.

The goal was to replace scattered spreadsheets and notes with a centralized platform that encourages consistency and long-term retention.

##  📌Overview

A full-stack coding interview preparation platform that helps developers organize coding problems, track progress, maintain revision schedules, and build consistent problem-solving habits.

PrepTracker transforms scattered notes and spreadsheets into a centralized dashboard for managing your DSA and interview preparation journey.
Instead of solving problems on the platform, users:

* Track solved problems
* Analyze performance
* Identify weak areas
* Maintain consistency

---

## 🌟Why PrepTracker?

Coding interview preparation often involves solving 300–500+ problems across topics such as Arrays, DP, Graphs, Trees, and Greedy Algorithms. Tracking progress manually through spreadsheets becomes inefficient and makes it difficult to identify weak areas. PrepTracker centralizes preparation into a single dashboard with analytics, revision tracking, and performance insights.

PrepTracker solves this by providing:

✅ Problem Tracking
✅ Progress Analytics
✅ Revision Management
✅ Smart Recommendations
✅ Performance Insights
✅ Consistency Tracking

---

## ✨ Key Features

### 1- 🔐Secure Authentication
* JWT-based authentication
* Protected routes
* Secure user sessions

### 2- 📝 Problem Tracking
* Add coding problems
* Mark problems as solved or unsolved
* Search and filter tracked problems
* Categorize by difficulty

### 3- 📊 Analytics Dashboard
* Total problems tracked
* Solved vs unsolved breakdown
* Focus area identification
* Streak tracking
* Progress visualization

### 4- 📈 Interactive Progress Analytics
* Difficulty-wise progress tracking
* Visual charts and statistics
* Performance insights

### 5- 📚 Revision Center
* Review previously solved problems
* Track last revision dates
* Identify overdue problems
* Strengthen long-term retention

### 6- 🎯 Smart Recommendations
* Suggest problems based on progress
* Encourage balanced practice
* Help improve weak areas

### 7- 📱 Responsive Design (In-Progress)
* Desktop-friendly interface
* Mobile-responsive layout
* Consistent user experience

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Recharts
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

###  Authentication System 

* User Registration
* Secure Password Hashing (bcrypt)
* Login with credential validation
* JWT Token Generation
* Protected Routes using Middleware
  
#### 🚧 Deployment

* Backend: Render
* Frontend: Vercel
* Database: MongoDB Atlas

---

## 🏗️ System Architecture

```mermaid
flowchart TD

A[User] --> B[React Frontend]

subgraph Frontend
B --> C[Authentication]
B --> D[Dashboard]
B --> E[Problem Tracking]
B --> F[Analytics]
B --> G[Revision Center]
end

B -->|Axios Requests| H[Express Backend]

subgraph Backend
H --> I[Routes]
I --> J[Controllers]
J --> K[JWT Middleware]
J --> L[Business Logic]
end

L --> M[(MongoDB)]

M --> N[Users Collection]
M --> O[Problems Collection]

L --> P[Analytics Engine]
L --> Q[Recommendation Engine]
L --> R[Revision Tracking]
```

---

## 📂 Project Structure 
### ⚙️ Backend Architecture

Follows **MVC Pattern**:

```bash
backend/
│
├── config/        # DB connection
├── controllers/   # Business logic
├── models/        # Schemas
├── routes/        # API routes
├── middleware/    # Auth middleware
├── server.js
├── index.js
├── package.json
├── .env
```

---

### ⚙️ Frontend Architecture

```bash
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── layouts/
│   └── App.jsx
│
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```
---

## 🗄️ Database Schema

```mermaid
erDiagram

USER {
    string _id
    string name
    string email
    string password
}

Problem
{
 title,
 difficulty,
 topic,
 tags,
 link,
 platform,
 description
}

Tracking
{
 user,
 problem,
 status,
 notes,
 lastReviewed
} 

USER ||--o{ PROBLEM : tracks
```
---

## 🔌 API Endpoints

### Authentication

POST /api/auth/register 
POST /api/auth/login 
GET /api/auth/profile

### Problems

GET /api/problems
POST /api/problems
GET /api/problems/:id
PUT /api/problems/:id
DELETE /api/problems/:id

### Tracking

GET    /api/tracking
POST   /api/tracking
PUT    /api/tracking/:trackingId
DELETE /api/tracking/:trackingId

### Dashboard

GET /api/dashboard
Activity History
GET /api/activity


---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/HARSHITA-SRIVASTAVA/InterviewPrepPlatform_Project.git

cd InterviewPrepPlatform_Project
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm run dev
```

### 3.Frontend Steup

```bash
cd frontend
npm install
npm run dev
```

Application will run at:

```bash
http://localhost:5173
```

---

## 📌 Project Highlights

- Full-Stack MERN Architecture
- JWT Authentication
- RESTful API Architecture
- MVC Backend Structure
- Interactive Data Visualization
- Protected Routes
- Revision Tracking System
- Cloud Deployment with CI/CD (GitHub → Vercel/Render)
  
---

## 🚀 Future Enhancements

### Phase 1
-  [ ] Dark Mode
-  [ ] Export Progress Reports
-  [ ] Contest Tracking
-  [ ] Responsive Design

### Phase 2
- [ ]  LeetCode API Integration
- [ ]  Weekly Email Reports
- [ ]  Topic-wise Learning Paths

### Phase 3
-  [ ] AI-Powered Revision Suggestions
-  [ ]  Spaced Repetition System

---

## 📈 What I Learned

This project helped strengthen my understanding of:

* Full-Stack Application Development
* React State Management
* REST API Design
* JWT Authentication
* MongoDB Data Modeling
* Dashboard UI Design
* Data Visualization with Recharts
* Responsive Design Principles

---

## 🧩 Challenges & Solutions

### 1.Authentication & Protected Routes

Managing user sessions across multiple pages was challenging. I solved this using JWT authentication, React Context API, and protected routes to ensure secure access control.

### 2.Analytics Visualization

Transforming raw tracking data into meaningful charts required data aggregation and debugging Recharts rendering issues. Proper data formatting and responsive chart containers resolved these challenges.

### 3.Revision Tracking Logic

Designing a useful revision system required identifying problems that needed review based on previous activity. I implemented date-based revision tracking to encourage long-term retention.

### 4.UI Consistency & Scalability

As more pages were added, maintaining consistent layouts became difficult. I created a reusable Dashboard Layout component to centralize shared UI elements such as the sidebar and header.

### 5.Responsive Design
Building a dashboard that worked across different screen sizes required careful use of Tailwind's responsive utilities and flexible grid layouts.

---

## 🤝 Contributing

Contributions, ideas, and suggestions are welcome.

1.Fork the repository
2.Create a feature branch
3.Commit changes
4.Open a Pull Request

---

## 👨‍💻 Author

Harshita Srivastava

---
