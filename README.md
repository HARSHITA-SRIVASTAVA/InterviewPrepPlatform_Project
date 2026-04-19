# 🚀 Smart Interview Preparation Platform

## 📌 Overview

A full-stack web application designed to help students **track, analyze, and improve their coding interview preparation** in a structured and data-driven way.

Instead of solving problems on the platform, users:

* Track solved problems
* Analyze performance
* Identify weak areas
* Maintain consistency

---

## 🎯 Problem It Solves

Students preparing for coding interviews often:

* Lack structured tracking
* Don’t know weak areas
* Lose consistency over time

This platform provides:
👉 Centralized tracking + analytics + progress visibility

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)

### Frontend *(Upcoming)*

* React.js
* Tailwind CSS
* Axios

### Deployment *(Planned)*

* Backend: Render
* Frontend: Vercel
* Database: MongoDB Atlas

---

## 🔐 Authentication System (Implemented)

* User Registration
* Secure Password Hashing (bcrypt)
* Login with credential validation
* JWT Token Generation
* Protected Routes using Middleware

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
```

---

## 📡 API Endpoints (Current)

### Auth Routes

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user (returns JWT)
* `GET /api/auth/profile` → Protected route

---

## 🔍 Key Learnings & Challenges

### 1. Authentication System

* Implemented JWT-based authentication
* Used bcrypt for secure password storage

### 2. Debugging Real Issues

* Fixed MongoDB SRV connection error (network/DNS issue)
* Switched to standard connection string
* Resolved multiple server instance conflict

### 3. Backend Design

* Designed scalable folder structure
* Separated concerns (routes, controllers, models)

---

## 🧠 Important Concepts Used

* REST API design
* Middleware in Express
* JWT (stateless authentication)
* Password hashing
* MongoDB schema design
* Environment variable management

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd InterviewPrepPlatform_Project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Create `.env`

```env
PORT=5000
MONGO_URI=your_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run Server

```bash
node server.js
```

---

## 📈 Resume Value

This project demonstrates:

* Backend development with Node.js & Express
* Secure authentication using JWT
* Database integration with MongoDB Atlas
* Real-world debugging and problem-solving
* Scalable project architecture

---

## 🚧 Current Progress

### ✅ Completed

* Backend setup
* Authentication system (JWT)
* Protected routes
* Database integration

### 🔜 In Progress

* Problem Management (CRUD)
* Dashboard analytics
* Streak tracking

---

## 📸 Screenshots *(Add Later)*

Add after frontend is ready:

* Dashboard UI
* Problem tracking interface
* Analytics view

---

## 🧾 When to Update This README

Update ONLY when:

* New feature added
* Architecture changes
* Major bug fixed (worth explaining)
* Deployment completed

---

## 🚀 Future Improvements

* Smart problem recommendations
* Performance analytics (charts)
* Full frontend integration
* Deployment (Vercel + Render)

---

## 👨‍💻 Author

Harshita Srivastava

---

## 💡 Interview Tip

Be ready to explain:

* Authentication flow (JWT)
* How middleware works
* How you handled real debugging issues
* Why you chose this architecture
