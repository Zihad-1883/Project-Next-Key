# NextKey — Premium Home Rental Marketplace

> Connecting verified landlords with tenants across Bangladesh. No fake listings. No broker fees.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/cloud/atlas)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

---

## Live URLs

| Service       | URL                                               |
|---------------|---------------------------------------------------|
| Frontend App  | https://project-next-key.vercel.app/                        |
| Backend API   | https://project-next-key.onrender.com/              |
| Health Check  | https://project-next-key.onrender.com/api/health       |
| GitHub Repo   | https://github.com/Zihad-1883/Project-Next-Key        |

---

## Table of Contents

1. [Overview](#1-overview)
2. [Features](#2-features)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Getting Started](#5-getting-started)
   - [Prerequisites](#prerequisites)
   - [Clone the Repo](#clone-the-repo)
   - [Server Setup](#server-setup)
   - [Client Setup](#client-setup)
   - [Running Both Together](#running-both-together)
6. [Environment Variables](#6-environment-variables)
7. [API Reference](#7-api-reference)
8. [Pages & Routes](#8-pages--routes)
9. [User Roles & Permissions](#9-user-roles--permissions)
10. [Database Seeding](#10-database-seeding)
11. [Deployment](#11-deployment)
12. [License](#12-license)

---

## 1. Overview

**NextKey** is a full-stack, production-grade property rental platform built as part of the SCIC Web Development Program. It solves the pain of traditional rental searches — unverified listings, hidden broker fees, and no real-time communication between landlords and tenants.

This is a **monorepo** with two separate applications:

| App | Directory | Framework | Port |
|-----|-----------|-----------|------|
| Frontend | `/client` | Next.js 16 (App Router) | 3000 |
| Backend API | `/server` | Express 5 + TypeScript | 5000 |

---

## 2. Features

### Tenants
- Search properties by location, type, price, bedrooms & bathrooms
- Browse paginated, verified listings with sort controls
- Submit rental requests with move-in dates
- Track all booking requests in a personal dashboard
- Leave star ratings and written reviews on properties

### Landlords
- Publish property listings with photos, pricing, and full descriptions
- Edit or delete own listings from a management dashboard
- View all incoming rental requests per listing
- Accept or decline tenant requests

### Platform-wide
- JWT-based authentication with role-based access control
- Fully responsive layout — mobile-first with animated hamburger drawer
- Smooth hero image cross-fade slideshow
- Toast notifications for all user actions
- Server-side pagination for all property listings

---

## 3. Tech Stack

### Frontend — `/client`

| Package | Version | Role |
|---------|---------|------|
| Next.js | 16.2 | React framework (App Router, SSR) |
| React | 19 | UI rendering |
| TypeScript | 5 | Static type safety |
| Tailwind CSS | 4 | Utility-first CSS |
| Framer Motion | 12 | Page & component animations |
| Lucide React | 1.24 | Icon library |
| Axios | 1.18 | HTTP client with JWT interceptor |
| React Hot Toast | 2.6 | Toast notifications |
| Recharts | 3.9 | Charts for landlord dashboard |

### Backend — `/server`

| Package | Version | Role |
|---------|---------|------|
| Express | 5 | REST API server |
| TypeScript | 7 | Static type safety |
| MongoDB | 7 | Database (native driver) |
| jsonwebtoken | 9 | JWT generation & verification |
| bcryptjs | 3 | Password hashing |
| tsx | 4 | TypeScript execution + hot reload |
| cors | 2.8 | Cross-origin request handling |
| dotenv | 17 | Environment variable loading |

---

## 4. Project Structure

```
Rent Nest/                              <- Monorepo root
|
+-- client/                             <- Next.js 16 Frontend
|   +-- src/
|   |   +-- app/                        <- App Router (file-based routing)
|   |   |   +-- layout.tsx              <- Root layout, Google fonts, providers
|   |   |   +-- globals.css             <- Tailwind theme + global CSS resets
|   |   |   +-- page.tsx               <- Home page
|   |   |   +-- properties/
|   |   |   |   +-- page.tsx           <- Browse & filter all listings
|   |   |   |   +-- [id]/page.tsx      <- Single property detail page
|   |   |   |   +-- add/page.tsx       <- Add new listing (landlord)
|   |   |   |   +-- manage/page.tsx    <- Landlord management dashboard
|   |   |   +-- my-requests/page.tsx   <- Tenant booking history
|   |   |   +-- login/page.tsx         <- Sign in
|   |   |   +-- register/page.tsx      <- Sign up (select role)
|   |   |   +-- about/page.tsx         <- About NextKey
|   |   |   +-- contact/page.tsx       <- Contact + support form
|   |   +-- components/
|   |   |   +-- Navbar.tsx             <- Sticky navbar + mobile drawer
|   |   |   +-- Footer.tsx             <- Footer with links & contact
|   |   |   +-- PropertyCard.tsx       <- Listing card + skeleton loader
|   |   +-- context/
|   |   |   +-- AuthContext.tsx        <- Global auth state provider
|   |   +-- lib/
|   |       +-- api.ts                 <- Axios instance + JWT header interceptor
|   +-- public/                        <- Static assets (favicon, images)
|   +-- next.config.ts                 <- Image domains, bundle optimization
|   +-- postcss.config.mjs
|   +-- package.json
|
+-- server/                            <- Express 5 Backend
|   +-- src/
|   |   +-- index.ts                   <- Entry point: app config, route mounting
|   |   +-- config/
|   |   |   +-- db.ts                  <- MongoDB Atlas connection
|   |   +-- controllers/
|   |   |   +-- authController.ts      <- Register, login, getCurrentUser
|   |   |   +-- propertyController.ts  <- Full property CRUD
|   |   |   +-- rentalController.ts    <- Rental request handling
|   |   |   +-- reviewController.ts    <- Property reviews & ratings
|   |   +-- middleware/
|   |   |   +-- authMiddleware.ts      <- JWT verify, role-based guards
|   |   +-- routes/
|   |   |   +-- authRoutes.ts
|   |   |   +-- propertyRoutes.ts
|   |   |   +-- rentalRoutes.ts
|   |   |   +-- reviewRoutes.ts
|   |   +-- scripts/
|   |   |   +-- seed.ts               <- DB seeder (demo landlords + listings)
|   |   +-- types/
|   |       +-- index.ts              <- Shared TypeScript interfaces
|   +-- .env                          <- Secret env vars (not committed)
|   +-- .env.example                  <- Safe template to copy from
|   +-- package.json
|
+-- architecture.md                    <- System design notes
+-- design.md                          <- UI/UX decisions
+-- prd.md                             <- Product requirements
+-- phases.md                          <- Development roadmap
+-- DOCS.md                            <- This file
```

---

## 5. Getting Started

### Prerequisites

- **Node.js** >= 20.x  →  https://nodejs.org
- **npm** >= 10.x (comes with Node)
- **MongoDB Atlas** free cluster  →  https://www.mongodb.com/cloud/atlas

---

### Clone the Repo

```bash
git clone https://github.com/Zihad-1883/Project-Next-Key
cd "rent-nest"
```

---

### Server Setup

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and fill in your values (see Section 6), then:

```bash
# Populate database with demo data (recommended for first run)
npm run seed

# Start the API in development mode (hot reload via tsx watch)
npm run dev
```

The API will be running at → http://localhost:5000

---

### Client Setup

Open a **new terminal window**:

```bash
cd client
npm install
```

Create the file `client/.env`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
# Start the Next.js development server
npm run dev
```

The app will be running at → http://localhost:3000

---

### Running Both Together

You must keep **two terminals** open at all times during development:

```
Terminal 1              Terminal 2
-----------             -----------
cd server               cd client
npm run dev             npm run dev
(port 5000)             (port 3000)
```

---

## 6. Environment Variables

### `server/.env`

```env
# ─── Database ────────────────────────────────────────────────────────────────
# Option A: Atlas SRV (recommended)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nextkey

# Option B: Direct connection (avoids DNS issues on some local setups)
# MONGODB_URI=mongodb://<user>:<pass>@ac-xxxx-shard.mongodb.net:27017/nextkey?ssl=true&authSource=admin

DB_USERNAME=your-atlas-username
DB_PASSWORD=your-atlas-password

# ─── Server ──────────────────────────────────────────────────────────────────
PORT=5000

# ─── Auth ────────────────────────────────────────────────────────────────────
# Use a long, random string — never expose this publicly
JWT_SECRET=replace-this-with-a-long-random-string

# ─── CORS ────────────────────────────────────────────────────────────────────
CLIENT_URL=http://localhost:3000
```

### `client/.env`

```env
# Matches the PORT in server/.env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 7. API Reference

All endpoints are prefixed with `/api`.

### 7.1 Auth — `/api/auth`

| Method | Endpoint    | Auth    | Description                    |
|--------|-------------|---------|--------------------------------|
| POST   | `/register` | None    | Register new tenant/landlord   |
| POST   | `/login`    | None    | Login → returns JWT token      |
| GET    | `/me`       | Bearer  | Get currently logged-in user   |

### 7.2 Properties — `/api/properties`

| Method | Endpoint | Auth          | Description                        |
|--------|----------|---------------|------------------------------------|
| GET    | `/`      | None          | List properties (filters, pages)   |
| GET    | `/:id`   | None          | Get single property                |
| POST   | `/`      | Landlord      | Create new listing                 |
| PUT    | `/:id`   | Landlord/own  | Update listing                     |
| DELETE | `/:id`   | Landlord/own  | Delete listing                     |

#### Query Parameters for `GET /api/properties`

| Param        | Type   | Description                               |
|--------------|--------|-------------------------------------------|
| `search`     | string | Text match on title or location           |
| `propertyType` | string | Apartment / House / Room / Studio / Villa |
| `minPrice`   | number | Minimum price (BDT)                       |
| `maxPrice`   | number | Maximum price (BDT)                       |
| `bedrooms`   | number | Minimum bedroom count                     |
| `bathrooms`  | number | Minimum bathroom count                    |
| `sortBy`     | string | `price` or `createdAt`                    |
| `sortOrder`  | string | `asc` or `desc`                           |
| `page`       | number | Page number — default `1`                 |
| `limit`      | number | Items per page — default `8`              |

### 7.3 Rentals — `/api/rentals`

| Method | Endpoint                  | Auth     | Description                   |
|--------|---------------------------|----------|-------------------------------|
| POST   | `/`                       | Tenant   | Submit a rental request       |
| GET    | `/my`                     | Tenant   | View own request history      |
| GET    | `/property/:propertyId`   | Landlord | View requests for a listing   |
| PATCH  | `/:id/status`             | Landlord | Accept or decline a request   |

### 7.4 Reviews — `/api/reviews`

| Method | Endpoint                  | Auth   | Description                  |
|--------|---------------------------|--------|------------------------------|
| POST   | `/`                       | Tenant | Submit a star rating + text  |
| GET    | `/property/:propertyId`   | None   | Fetch all reviews            |

### 7.5 System

```
GET /api/health  →  { "status": "OK", "message": "Express backend is online" }
GET /           →  Welcome message
```

---

## 8. Pages & Routes

| Route                | Access   | Description                                               |
|----------------------|----------|-----------------------------------------------------------|
| `/`                  | Public   | Home — hero slideshow, categories, featured listings, FAQs |
| `/properties`        | Public   | Browse all listings — search, filter, sort, pagination    |
| `/properties/[id]`   | Public   | Property detail — gallery, specs, rental request form     |
| `/properties/add`    | Landlord | Form to publish a new property listing                    |
| `/properties/manage` | Landlord | Dashboard — edit/delete listings, manage requests         |
| `/my-requests`       | Tenant   | Tenant's full booking request history and statuses        |
| `/login`             | Public   | Sign in to an existing account                            |
| `/register`          | Public   | Create account — choose tenant or landlord role           |
| `/about`             | Public   | NextKey mission, pillars, company milestones              |
| `/contact`           | Public   | Contact form + hotline + email support info               |

---

## 9. User Roles & Permissions

| Permission                    | Tenant | Landlord |
|-------------------------------|--------|----------|
| Browse all properties         | Yes    | Yes      |
| View property details         | Yes    | Yes      |
| Submit rental request         | Yes    | No       |
| View own request history      | Yes    | No       |
| Leave property reviews        | Yes    | No       |
| Create property listing       | No     | Yes      |
| Edit own listings             | No     | Yes      |
| Delete own listings           | No     | Yes      |
| View incoming requests        | No     | Yes      |
| Accept / decline requests     | No     | Yes      |

> Role is selected at registration and **cannot be changed afterwards**.

---

## 10. Database Seeding

```bash
cd server
npm run seed
```

This populates the database with:
- **22+ demo landlord accounts** with hashed passwords
- **Sample property listings** distributed across major Dhaka areas
  (Dhanmondi, Gulshan, Banani, Mirpur, Uttara, Mohammadpur, etc.)
- **Demo tenant account** for testing the booking flow

#### Demo Login Credentials (after seeding)

| Role     | Email               | Password  |
|----------|---------------------|-----------|
| Tenant   | tenant@nextkey.xyz     | password123  |
| Landlord | landlord@nextkey.xyz   | password123  |

> For the full list of seeded accounts, see `server/src/scripts/seed.ts`.

---

## 11. Deployment

### Frontend — Vercel (Recommended)

1. Push your code to GitHub
2. Import the repo at https://vercel.com/new
3. Set **Root Directory** to `client`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL = https://your-api-domain.onrender.com/api
   ```
5. Deploy

Live client URL → https://nextkey.vercel.app *(replace with yours)*

---

### Backend — Render (Recommended)

1. Go to https://render.com → New Web Service
2. Connect your GitHub repo
3. Set **Root Directory** to `server`
4. Set **Build Command**: `npm install && npm run build`
5. Set **Start Command**: `npm start`
6. Add all environment variables from `server/.env`
7. Deploy

Live API URL → https://nextkey-api.onrender.com *(replace with yours)*

---

### Production Build (Manual)

**Server:**
```bash
cd server
npm run build      # TypeScript -> /dist
npm start          # Runs node dist/index.js
```

**Client:**
```bash
cd client
npm run build      # Optimized Next.js production bundle
npm start          # Starts server on port 3000
```

---

## 12. License

This project was built as part of the **SCIC Web Development Program**.
Feel free to use it as a reference or learning resource.

---

Made with love for secure renting — NextKey

