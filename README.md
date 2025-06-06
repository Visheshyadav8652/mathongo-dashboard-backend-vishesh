# Mathongo Dashboard Backend

A RESTful API backend for a Chapter Performance Dashboard, built with Node.js, Express.js, MongoDB (Mongoose), and Redis. This project supports chapter management, filtering, pagination, caching, and rate limiting.

## Features
- **RESTful API Endpoints** for chapters (CRUD, filtering, pagination)
- **Admin-only chapter upload** via JSON file
- **Redis caching** for GET endpoints (1 hour cache, auto-invalidation)
- **Redis-based rate limiting** (30 requests/minute per IP)
- **MongoDB** for persistent storage

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis
- Multer (file uploads)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd mathongo-dashboard-backend-vishesh
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
REDIS_URL=redis://localhost:6379
ADMIN_TOKEN=<your_admin_token>
```

### 4. Start Redis Server
- **Windows:** Use Docker
- **Linux/Mac:** `redis-server`

### 5. Start the Server
```sh
npm run dev
```

## API Endpoints

### GET /api/v1/chapters
- Returns all chapters
- Supports filters: `class`, `unit`, `status`, `weakChapters`, `subject`
- Pagination: `page`, `limit`
- Returns: `{ total, chapters }`

### GET /api/v1/chapters/:id
- Returns a specific chapter by ID

### POST /api/v1/chapters
- **Admin only** (requires `Authorization` header with `ADMIN_TOKEN`)
- Upload chapters via JSON file (form-data, key: `file`)
- Returns inserted and failed chapters

## Caching & Rate Limiting
- **GET /api/v1/chapters** is cached in Redis for 1 hour
- Cache is invalidated on new chapter upload
- All routes are rate-limited to 30 requests/minute per IP (Redis-based)

## Testing
- Use [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download) to test endpoints
- Example JSON for upload:
```json
[
  {
    "name": "Algebra Basics",
    "class": "10",
    "unit": "1",
    "status": "active",
    "weakChapters": false,
    "subject": "Mathematics"
  }
]
```

## Deployment
- Deployable on Render, Railway, Fly.io, or EC2
- Set environment variables on your hosting platform

## License
MIT
