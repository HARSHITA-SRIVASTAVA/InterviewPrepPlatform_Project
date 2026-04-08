# InterviewPrepPlatform_Project
Smart Interview Preparation Platform
📌 Project Overview

A full-stack web application designed to help students track, analyze, and improve their coding interview preparation in a structured and personalized way.

Instead of solving problems on the platform, users:

Track solved problems
Analyze performance
Identify weak areas
Maintain consistency
🚀 Features
Core Features
User Authentication (JWT-based)
Problem Management (title, difficulty, tags, link)
Problem Tracking (solved/unsolved, notes)
Dashboard (progress analytics)
Filtering & Search
Advanced Features (Planned)
Streak Tracking
Smart Recommendations
Activity History
🛠 Tech Stack

Frontend:

React.js
Tailwind CSS
Axios

Backend:

Node.js
Express.js

Database:

MongoDB Atlas (cloud)

Authentication:

JWT
🧠 Key Backend Concepts Used
MVC Architecture (routes, controllers, models)
REST API design
Environment variables (.env)
MongoDB connection using Mongoose
Error handling and debugging
⚙️ Setup Instructions
1. Clone the repo
git clone <your-repo-link>
cd InterviewPrepPlatform_Project
2. Backend setup
cd backend
npm install
3. Create .env file
MONGO_URI=your_mongodb_connection_string
PORT=5000
4. Run server
node server.js
🔍 Important Debugging Learnings
Fixed MODULE_NOT_FOUND by correcting project structure
Resolved Git tracking issues (node_modules, .env)
Solved MongoDB connection error:
SRV DNS issue (ECONNREFUSED)
Switched to standard connection string
