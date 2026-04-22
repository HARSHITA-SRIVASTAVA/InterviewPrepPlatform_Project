#  Smart Interview Preparation Platform (Backend)

A scalable backend system designed to help students **track, analyze, and improve coding interview preparation** through structured problem tracking and analytics.

---

## Overview

This backend powers a full-stack application focused on **interview preparation management**, not problem solving.

Users can:

* Track coding problems from platforms like LeetCode
* Monitor progress and consistency
* View analytics and activity history
* Receive structured insights into their preparation

## Tech Stack

* **Node.js** – Runtime environment
* **Express.js** – Backend framework
* **MongoDB Atlas** – Cloud database
* **Mongoose** – ODM for MongoDB
* **JWT (JSON Web Tokens)** – Authentication
* **Bcrypt.js** – Password hashing


## Authentication Features

* User registration with validation
* Secure password hashing using bcrypt
* Login with JWT token generation
* Protected routes using middleware


## Core Features

###  1.Problem Management

* Add, update, delete problems
* Store metadata: title, difficulty, tags, platform, link
* Enforced uniqueness using compound index (`title + platform`)


###  2.Problem Tracking

* Track problems as solved/unsolved
* Add personal notes
* Prevent duplicate tracking per user
* User-specific tracking system


### 3. Dashboard Analytics

* Total problems tracked
* Solved vs unsolved breakdown
* Progress percentage calculation


### 4.Activity History

* Shows recent user activity
* Sorted by latest updates
* Limited results for performance optimization
* Uses MongoDB sorting and population


##  Key Backend Concepts Implemented

* RESTful API design
* Middleware-based authentication
* Relational data modeling using MongoDB references
* Data integrity via compound indexing
* Query optimization with `.populate()`, `.sort()`, `.limit()`
* Structured error handling
* Scalable project architecture


## 📂 Project Structure

//image : **

## API Endpoints

### Auth Routes


POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile




###  Problem Routes


POST   /api/problems
GET    /api/problems
GET    /api/problems/:id
PUT    /api/problems/:id
DELETE /api/problems/:id

### Tracking Routes

POST   /api/tracking
GET    /api/tracking
PUT    /api/tracking/:id
DELETE /api/tracking/:id

###  Dashboard

GET /api/dashboard

### Activity

GET /api/activity

##  Environment Variables

Create a `.env` file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


##  Running Locally

```bash
# Install dependencies
npm install

# Run server
npm run dev
```

##  Testing

* Tested using Postman
* Verified:

  * Authentication flow
  * Protected routes
  * Data validation
  * Sorting & filtering logic


##  Deployment

* Backend deployed on Render
* Database hosted on MongoDB Atlas


##  Resume Highlights

* Built a production-ready backend with authentication, analytics, and activity tracking
* Designed scalable REST APIs with MongoDB and Express
* Implemented relational data handling using Mongoose
* Ensured data integrity with compound indexing
* Developed optimized queries using sorting, limiting, and population

##  Future Improvements

* Smart problem recommendations
* Streak tracking system
* Advanced filtering & search
* Activity event logging system
* Frontend integration (React)


##  Author

HARSHITA SRIVASTAVA
Developed as part of a full-stack project to master backend engineering and system design fundamentals.
