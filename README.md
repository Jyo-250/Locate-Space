# 📍 LocateSpace

<div align="center">

A full-stack **MERN** application that helps users discover **properties** and **job opportunities** while allowing authenticated users to publish and manage their own listings.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

</div>

---

## 📖 About

LocateSpace is a platform that combines **property listings** and **job postings** into a single application.

Users can browse available properties and jobs without logging in. After creating an account, they can publish their own listings, manage them through a personal dashboard, and securely authenticate using JWT.

The project follows a clean client-server architecture using React on the frontend and Express with MongoDB on the backend.

---

# ✨ Features

## 🏠 Property Module

- Browse available properties
- View detailed property information
- Publish new property listings
- Delete your own property listings

---

## 💼 Job Module

- Browse available job opportunities
- View complete job details
- Publish job postings
- Delete your own job posts

---

## 🔐 Authentication

- User Registration
- User Login
- Password hashing with **bcrypt**
- JWT Authentication
- Protected Routes

---

## 👤 My Posts

Authenticated users can

- View all their property listings
- View all their job postings
- Delete their own posts

---

## ⚡ User Experience

- Responsive React interface
- React Router navigation
- Dynamic property pages
- Dynamic job pages
- Clean and intuitive layout

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router DOM
- Axios

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JSON Web Token (JWT)
- bcrypt

---

# 📂 Project Structure

```
LocateSpace
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Jyo-250/Locate-Space.git
```

```bash
cd Locate-Space
```

---

## 2. Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd ../server
npm install
```

---

## 3. Environment Variables

Create a `.env` file inside the `server` directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 4. Run the Backend

```bash
npm start
```

---

## 5. Run the Frontend

```bash
cd ../client
npm run dev
```

The frontend will start on

```
http://localhost:5173
```

---

# 📱 Application Pages

- 🏠 Home
- 🏡 Property Listings
- 📍 Property Details
- 💼 Job Listings
- 📋 Job Details
- 🔐 Login
- 📝 Register
- 👤 My Posts

---

# 🔒 Security

- Passwords are hashed using **bcrypt**
- JWT-based authentication
- Protected API routes
- Ownership-based authorization for deleting posts

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

# 👨‍💻 Author

**Jyotshna Murahari**

GitHub: https://github.com/Jyo-250

If you found this project useful, consider giving it a ⭐ on GitHub.
