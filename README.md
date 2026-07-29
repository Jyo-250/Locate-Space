# LocateSpace

A full-stack web application for finding and posting property listings and job openings.

## Features

- **Property Listings** — Browse houses, apartments, shops, and daily rentals; filter by type
- **Job Listings** — Browse jobs across 10 categories; filter by category
- **Post Listings** — Authenticated users can post properties and jobs
- **My Posts** — Dashboard to view and manage your own posts
- **Delete Own Posts** — Ownership-based delete (users can only delete their own listings)
- **Live Search** — Real-time filtering by title, location, and category
- **JWT Authentication** — Secure login and registration with token-based auth

## Tech Stack

**Frontend:** HTML, CSS, JavaScript, Bootstrap  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Atlas)  
**Auth:** JSON Web Tokens (JWT)

## Project Structure

```
Locate-Space/
├── index.html              # Home page
├── myPosts.html            # My Posts dashboard
├── style.css
├── property/
│   ├── house.html          # Property landing page
│   ├── findProperty/       # Browse property listings
│   └── upload/             # Post a property
├── job/
│   ├── job.html            # Job landing page
│   ├── findjob/            # Browse job listings
│   └── uploadjob/          # Post a job
├── signin/                 # Login & Signup
├── contact/
└── server/
    ├── index.js
    ├── models/
    │   ├── User.js
    │   ├── Listing.js
    │   └── Job.js
    ├── routes/
    │   ├── auth.js
    │   ├── listings.js
    │   └── jobs.js
    └── middleware/
        └── authMiddleware.js
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Jyo-250/Locate-Space.git
   cd Locate-Space
   ```

2. Install backend dependencies
   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file inside the `server/` folder
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server
   ```bash
   node index.js
   ```

5. Open `https://locate-space-hzh1.onrender.com` in your browser

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register a new user |
| POST | /api/auth/login | No | Login and get token |
| GET | /api/listings | No | Get all property listings |
| POST | /api/listings | Yes | Create a listing |
| GET | /api/listings/mine | Yes | Get your listings |
| DELETE | /api/listings/:id | Yes | Delete your listing |
| GET | /api/jobs | No | Get all jobs |
| POST | /api/jobs | Yes | Post a job |
| GET | /api/jobs/mine | Yes | Get your jobs |
| DELETE | /api/jobs/:id | Yes | Delete your job |
