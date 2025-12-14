
# FitPlanHub

## Description

FitPlanHub is a full-stack fitness platform that connects trainers with users looking for structured workout plans.  
Trainers can create and manage fitness plans, while users can explore trainers, follow them, subscribe to plans, and access personalized fitness content.

The project emphasizes backend logic, secure authentication, database relationships, and role-based access control, supported by a responsive Bootstrap frontend.

---

## Features

### Core Features
- User and Trainer authentication using JWT
- Role-based access control
- Secure REST APIs with proper validation
- Responsive Bootstrap-based UI
- Protected routes and controlled data access

### Trainer Capabilities
- Create fitness plans
- Edit and delete own plans
- Manage all plans from a trainer dashboard

### User Capabilities
- Browse fitness plans and trainers
- Follow and unfollow trainers
- Subscribe to fitness plans (simulated payment)
- Access personalized feed from followed trainers
- View full plan details only after subscription

---

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv

**Frontend**
- HTML
- CSS
- Bootstrap 5

**Tools**
- MongoDB Compass
- Nodemon

---

## How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/AdityaMaheshwari30114/FitPlanHub
cd FitPlanHub
````

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 3. Environment Setup

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fitplanhub
JWT_SECRET=fitplanhub_secret_key
```

---

### 4. Start Backend Server

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 5. Run Frontend

Open the following file using Live Server or a browser:

```
frontend/pages/index.html
```

Frontend runs on:

```
http://127.0.0.1:5500/frontend/pages/index.html
```

---

## Note

* MongoDB must be running locally

---
