<h1 align="center">
  🎬 BiooScoops
</h1>

<p align="center">
  <b>A full-stack movie ticket booking platform built with React, Node.js, Express, and MongoDB.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Database Models](#database-models)
- [Frontend Pages & Routes](#frontend-pages--routes)
- [Authentication Flow](#authentication-flow)
- [Seat Layout & Pricing](#seat-layout--pricing)
- [Scripts](#scripts)
- [Contributing](#contributing)

---

## 🌟 Overview

**BiooScoops** is a modern, full-stack **movie ticket booking application** that lets users:

- Browse currently running movies
- Select a city/state to find nearby theaters and shows
- Pick seats from an interactive seat layout
- Checkout and book tickets securely
- Manage their profile

The backend is built with **Node.js + Express + TypeScript** and the frontend with **React 19 + Vite + TailwindCSS v4**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 OTP Authentication | Passwordless login via email OTP |
| 🎥 Movie Browsing | List and filter movies by city, genre, language |
| 🏟️ Theater & Show Selection | View theaters and available showtimes |
| 💺 Interactive Seat Layout | Visual seat picker with real-time availability |
| 💳 Checkout | Book selected seats and confirm tickets |
| 👤 User Profile | View and manage user account details |
| 🔒 JWT Auth | Secure access & refresh token system with HTTP-only cookies |
| 📧 Email Service | OTP delivery via Nodemailer |
| 🌐 CORS Secured | Configured cross-origin resource sharing |

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | Latest LTS | Runtime environment |
| Express | ^5.2.1 | Web framework |
| TypeScript | ^6.0.3 | Type safety |
| MongoDB + Mongoose | ^9.6.2 | Database + ODM |
| JSON Web Token | ^9.0.3 | Authentication tokens |
| Nodemailer | ^8.0.10 | Email OTP delivery |
| Mailgen | ^2.0.34 | Beautiful email templates |
| Zod | ^4.4.3 | Schema validation |
| Cookie-Parser | ^1.4.7 | Cookie handling |
| Day.js | ^1.11.21 | Date/time utilities |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | ^19.2.6 | UI library |
| Vite | ^8.0.12 | Build tool & dev server |
| TailwindCSS | ^4.3.0 | Utility-first CSS |
| React Router DOM | ^7.15.0 | Client-side routing |
| TanStack Query | ^5.100.11 | Server state management |
| Axios | ^1.16.1 | HTTP client |
| React Hot Toast | ^2.6.0 | Notifications |
| React Icons | ^5.6.0 | Icon library |
| Swiper | ^12.1.4 | Carousel/slider |
| Socket.io Client | ^4.8.3 | Real-time communication |
| date-fns | ^4.1.0 | Date formatting |

---

## 📂 Project Structure

```
BiooScoops/
├── backend/                        # Node.js + TypeScript API
│   ├── app.ts                      # Express app setup, CORS, middleware
│   ├── server.ts                   # Server entry point
│   ├── routes/
│   │   └── index.ts                # Global route aggregator
│   ├── modules/
│   │   ├── auth/                   # OTP-based authentication
│   │   │   ├── auth.controller.ts  # sendOTP, verifyOTP, logOut
│   │   │   ├── auth.route.ts       # Auth routes
│   │   │   ├── auth.interface.ts   # Auth TypeScript interfaces
│   │   │   ├── otp.service.ts      # OTP generation, hashing, email
│   │   │   ├── token.service.ts    # JWT access & refresh tokens
│   │   │   └── refresh.model.ts    # Refresh token Mongoose model
│   │   ├── movie/                  # Movie management
│   │   │   ├── movie.controller.ts
│   │   │   ├── movie.model.ts      # Movie schema (title, genre, rating, etc.)
│   │   │   ├── movie.route.ts
│   │   │   ├── movie.service.ts
│   │   │   ├── movie.validation.ts # Zod validation schemas
│   │   │   └── movie.interface.ts
│   │   ├── theater/                # Theater & seat config
│   │   │   ├── theater.controller.ts
│   │   │   ├── theater.model.ts    # Theater schema with seat layout
│   │   │   ├── theater.route.ts
│   │   │   ├── theater.service.ts
│   │   │   ├── theater.validation.ts
│   │   │   └── theater.interface.ts
│   │   ├── show/                   # Show scheduling
│   │   │   ├── show.controller.ts
│   │   │   ├── show.model.ts       # Show schema (movie, theater, time, seats)
│   │   │   ├── show.routes.ts
│   │   │   ├── show.service.ts
│   │   │   └── show.interface.ts
│   │   └── user/                   # User management
│   ├── middlewares/
│   │   └── error.middleware.ts     # Global error handler
│   ├── config/                     # DB connection & config
│   ├── utils/                      # Shared utilities
│   ├── apis/                       # External API integrations
│   ├── scripts/                    # Database seeder scripts
│   │   ├── seed-theater.ts         # Seed theater data
│   │   ├── seed-movies.ts          # Seed movie data
│   │   └── seed-show.ts            # Seed show data
│   ├── .env                        # Backend environment variables
│   ├── tsconfig.json
│   └── package.json
│
└── frontend/                       # React + Vite app
    ├── index.html
    ├── vite.config.js
    ├── src/
    │   ├── App.jsx                  # Root component with routes
    │   ├── main.jsx                 # Entry point, QueryClient setup
    │   ├── index.css                # Global styles
    │   ├── pages/
    │   │   ├── Home.jsx             # Landing page
    │   │   ├── Movies.jsx           # Movie listings with filters
    │   │   ├── MovieDetail.jsx      # Movie details + show listing
    │   │   ├── SeatLayout.jsx       # Interactive seat picker
    │   │   ├── CheckOut.jsx         # Booking confirmation & payment
    │   │   └── Profile.jsx          # User profile management
    │   ├── components/
    │   │   ├── auth/                # Auth flow components (OTP)
    │   │   ├── Movies/              # Movie card, carousel components
    │   │   ├── seatLayout/          # Seat grid, legend components
    │   │   ├── profile/             # Profile UI components
    │   │   └── shared/              # Header, Footer, Navbar
    │   ├── apis/                    # Axios API call functions
    │   ├── context/                 # React context providers
    │   ├── hooks/                   # Custom React hooks
    │   └── utils/                   # Helper functions
    ├── .env
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** (Atlas cloud or local instance)
- A Gmail / SMTP email account for OTP delivery

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/BiooScoops.git
cd BiooScoops
```

**2. Install Backend Dependencies**

```bash
cd backend
npm install
```

**3. Install Frontend Dependencies**

```bash
cd ../frontend
npm install
```

---

### Environment Variables

#### 📁 `backend/.env`

```env
# MongoDB connection string
MONGODB_URL=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/BioScoope

# Server port
PORT=3000

# Nodemailer credentials (Gmail / SMTP)
NODEMAILER_EMAIL=your-email@gmail.com
NODEMAILER_PASSWORD=your-app-password

# OTP hashing secret
HASH_SECRET=your_otp_hash_secret

# JWT secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

> ⚠️ **Never commit your `.env` file.** Use `.env.example` for sharing templates.

#### 📁 `frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

---

### Running the App

**Start the Backend (development)**

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:3000`.

**Start the Frontend (development)**

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 📡 API Reference

Base URL: `http://localhost:3000/api/v1`

### 🔐 Auth Routes — `/auth`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/send-otp` | Send OTP to user's email |
| `POST` | `/auth/verify-otp` | Verify OTP and return JWT tokens |
| `POST` | `/auth/logout` | Clear auth cookies and invalidate refresh token |

### 🎬 Movie Routes — `/movies`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/movies` | Get all movies |
| `GET` | `/movies/:id` | Get a single movie by ID |
| `POST` | `/movies` | Create a new movie (admin) |

### 🏟️ Theater Routes — `/theaters`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/theaters` | Get all theaters |
| `GET` | `/theaters/:id` | Get a single theater by ID |
| `POST` | `/theaters` | Create a new theater (admin) |

### 🎞️ Show Routes — `/show`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/show` | Get all shows |
| `GET` | `/show/:id` | Get a single show by ID |
| `POST` | `/show` | Create a new show (admin) |

### 👤 User Routes — `/user`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/user/me` | Get current logged-in user |
| `PUT` | `/user/:id` | Update user profile |

---

## 🗄️ Database Models

### 🎬 Movie
```ts
{
  title: String,          // Movie title
  description: String,    // Synopsis
  duration: String,       // e.g. "2h 30m"
  genre: [String],        // e.g. ["Action", "Thriller"]
  releaseDate: Date,
  language: [String],     // e.g. ["Hindi", "English"]
  certification: String,  // e.g. "U/A"
  posterUrl: String,
  rating: Number,         // e.g. 8.5
  votes: Number,
  format: [String],       // e.g. ["2D", "IMAX"]
}
```

### 🏟️ Theater
```ts
{
  name: String,
  location: String,       // Full address
  city: String,
  state: String,
  logo: String,
  seatLayoutConfig: [     // Per-row seat configuration
    {
      row: String,                                          // "A", "B", ...
      type: "NORMAL" | "EXECUTIVE" | "PREMIUM" | "RECLINER",
      price: Number,                                        // e.g. 180
      seatCount: Number,                                    // e.g. 26
    }
  ]
}
```

### 🎞️ Show
```ts
{
  movie: ObjectId,         // Ref → Movie
  theater: ObjectId,       // Ref → Theater
  location: String,
  formate: "2D" | "3D" | "IMAX" | "PVR PXL",
  audioType: String,       // Default: "Dolby Atmos"
  startTime: String,       // e.g. "10:30 AM"
  date: String,            // e.g. "2026-07-10"
  priceMap: Map<String, Number>,  // seat type → price
  seatLayout: []           // Dynamic seat availability matrix
}
```

---

## 🖥️ Frontend Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | `Home` | Hero section, featured movies carousel |
| `/auth` | `AuthFlow` | OTP-based email authentication |
| `/movies` | `Movies` | Browse all movies with filters |
| `/movies/:state/:movieName/:id/ticket` | `MovieDetail` | Movie details + show times + theaters |
| `/movies/:movieId/:movieName/:state/theater/:theaterId/shows/:showId/seat-layout` | `SeatLayout` | Interactive seat picker |
| `/shows/:showId/:state/checkout` | `CheckOut` | Order summary + booking confirmation |
| `/profile` | `Profile` | View and edit user profile |

---

## 🔐 Authentication Flow

BiooScoops uses **passwordless OTP authentication**:

```
1. User enters email address
       ↓
2. Backend generates 6-digit OTP
       ↓
3. OTP is hashed (HMAC-SHA256) with email + expiry timestamp
       ↓
4. OTP sent to user's email via Nodemailer
       ↓
5. Hash + expiry returned to client (stored temporarily)
       ↓
6. User enters OTP on frontend
       ↓
7. Backend verifies hash and checks expiry (2 minutes TTL)
       ↓
8. If valid → User created/found in DB
       ↓
9. Access Token + Refresh Token generated (JWT)
       ↓
10. Tokens stored as HTTP-only cookies (secure, sameSite: lax)
```

---

## 💺 Seat Layout & Pricing

The seat layout is dynamically generated from the theater's `seatLayoutConfig`. Each row has a type and price:

| Row | Type | Default Price |
|---|---|---|
| A, B, C | NORMAL | ₹180 |
| D, E, F | EXECUTIVE | ₹290 |
| G, H | PREMIUM | ₹510 |
| I | RECLINER | ₹750 |

Prices may vary per show via the `priceMap` field on the Show model.

---

## 🌱 Scripts (Seeder)

Seed your database with sample data:

```bash
# From the backend directory

# Seed theaters
npm run seed:theater

# Seed movies
npm run seed:movies

# Seed shows
npm run seed:shows
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a **Pull Request**

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use Case |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation update |
| `refactor:` | Code refactoring |
| `chore:` | Maintenance tasks |

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Made with ❤️ by the BiooScoops team
</p>
