#  PrepTracker

##  Overview

A full-stack coding interview preparation platform that helps developers organize coding problems, track progress, maintain revision schedules, and build consistent problem-solving habits.

PrepTracker transforms scattered notes and spreadsheets into a centralized dashboard for managing your DSA and interview preparation journey.
Instead of solving problems on the platform, users:

* Track solved problems
* Analyze performance
* Identify weak areas
* Maintain consistency

---

## Why PrepTracker?

Preparing for coding interviews often involves solving hundreds of problems across multiple topics and difficulty levels. Keeping track of progress, identifying weak areas, and revisiting old problems can quickly become overwhelming.

PrepTracker solves this by providing:

✅ Problem Tracking
✅ Progress Analytics
✅ Revision Management
✅ Smart Recommendations
✅ Performance Insights
✅ Consistency Tracking

---

## Key Features

## 1-🔐 Secure Authentication
JWT-based authentication
Protected routes
Secure user sessions

## 2-📝 Problem Tracking
Add coding problems
Mark problems as solved or unsolved
Search and filter tracked problems
Categorize by difficulty

## 3-📊 Analytics Dashboard
Total problems tracked
Solved vs unsolved breakdown
Focus area identification
Streak tracking
Progress visualization

## 4-📈 Interactive Progress Analytics
Difficulty-wise progress tracking
Visual charts and statistics
Performance insights

## 5-📚 Revision Center
Review previously solved problems
Track last revision dates
Identify overdue problems
Strengthen long-term retention

## 6-🎯 Smart Recommendations
Suggest problems based on progress
Encourage balanced practice
Help improve weak areas

---

## Application Screenshots

### 🏠 Home Page

The landing page introduces PrepTracker and highlights its core capabilities.

<img width="1891" height="902" alt="image" src="https://github.com/user-attachments/assets/ee2c2f4a-6720-4b3e-8206-e252422f665a" />

### 📊 Dashboard Overview

A centralized dashboard displaying progress metrics, achievements, streaks, and coding statistics.

<img width="1897" height="907" alt="image" src="https://github.com/user-attachments/assets/17952703-0d84-4d05-ac55-ae2eabaacee6" />

### 📈 Progress Tracking

Visual representation of coding progress across different difficulty levels.

<img width="1582" height="746" alt="image" src="https://github.com/user-attachments/assets/c816dc79-66d4-4f12-9785-153774b8a245" />


### 📝 Problem Tracking

Track coding problems, update status, search problems, and organize interview preparation efficiently.

<img width="1597" height="902" alt="image" src="https://github.com/user-attachments/assets/d962a097-92a2-4367-bf77-c6fb2a881a23" />

### 🎯 Recommended Problems

Personalized recommendations to encourage continuous learning.

<img width="1591" height="640" alt="image" src="https://github.com/user-attachments/assets/e05d083a-044f-4dfe-b992-a65ea8139171" />

### 📚 Revision Center

Review previously solved problems and maintain long-term retention through structured revision.

<img width="1890" height="906" alt="image" src="https://github.com/user-attachments/assets/a7499bb4-25e1-4b5c-807f-b48329a836d3" />

### 📈 Analytics 

Personalized analytics to improve and track performance.

<img width="1887" height="767" alt="image" src="https://github.com/user-attachments/assets/3258d57c-4f4b-4845-94c6-ce95b7ec3d53" />
<img width="1542" height="757" alt="image" src="https://github.com/user-attachments/assets/0d290842-84f3-4d28-afae-fd02b371d756" />

--- 

## 🎥 Demo

Login
Dashboard
Add Problem
Analytics
Revision Center
![Demo](screenshots/demo.gif)

---

## Tech Stack

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
* Database
* MongoDB
* Mongoose

###  Authentication System 

* User Registration
* Secure Password Hashing (bcrypt)
* Login with credential validation
* JWT Token Generation
* Protected Routes using Middleware
  
#### Deployment *(Planned)*

* Backend: Render
* Frontend: Vercel
* Database: MongoDB Atlas

---

## ⚙️ Backend Architecture

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

## ⚙️ Frontend Architecture

```bash
frontend/
│
├──src
    ├── api
    ├── components
    ├── context
    ├── pages
├── index.html
├── talwind.config,js
├── vite.config.js
├── server.jspackage.json
```

---

###  Database Models
User          Field	Type
name          String
email	        String	
password	    String

### Problem
Field          Type
title	         String
difficulty     String
tags           Array
link	         String

### Tracking
Field  	       Type
user	         ObjectId
problem        ObjectId
status         String
lastReviewed	 Date

### API Endpoints 

1.Authentication
Method          Endpoint
POST	          /api/auth/register
POST	          /api/auth/login

2.Problem Tracking
Method	        Endpoint
GET	            /api/tracking/get or getAll
POST	          /api/tracking/add
PUT	            /api/tracking/put
DELETE	        /api/tracking/delete or deleteAll

3.Analytics
Method	        Endpoint
GET	            /api/analytics/stats
GET	            /api/analytics/recommendations
GET	            /api/analytics/activity

---

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone : https://github.com/HARSHITA-SRIVASTAVA/InterviewPrepPlatform_Project
cd INTERVIEW_PREP_PROJECT
```

### 2. Backend Setup

```bash
cd backend
npm install

Create a .env file inside the backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start backend server:
npm run dev

```

### 3.Frontend Steup

cd client
npm install
npm run dev

Application will run at:
http://localhost:5173

---

## Future Enhancements

* Spaced Repetition Algorithm
* Dark Mode
* LeetCode API Integration
* Contest Tracking
* Weekly Performance Reports
* Export Progress Reports
* AI-Powered Revision Suggestions
* Topic-wise Learning Paths

---

## What I Learned

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

##  Challenges & Solutions

## Authentication & Protected Routes

Managing user sessions across multiple pages was challenging. I solved this using JWT authentication, React Context API, and protected routes to ensure secure access control.

## Analytics Visualization

Transforming raw tracking data into meaningful charts required data aggregation and debugging Recharts rendering issues. Proper data formatting and responsive chart containers resolved these challenges.

## Revision Tracking Logic

Designing a useful revision system required identifying problems that needed review based on previous activity. I implemented date-based revision tracking to encourage long-term retention.

## UI Consistency & Scalability

As more pages were added, maintaining consistent layouts became difficult. I created a reusable Dashboard Layout component to centralize shared UI elements such as the sidebar and header.

## Responsive Design
Building a dashboard that worked across different screen sizes required careful use of Tailwind's responsive utilities and flexible grid layouts.

---

## Contributing

Contributions, ideas, and suggestions are welcome.

1.Fork the repository
2.Create a feature branch
3.Commit changes
4.Open a Pull Request

---

## 👨‍💻 Author

Harshita Srivastava

---
