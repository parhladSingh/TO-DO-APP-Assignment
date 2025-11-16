# Full Stack Todo List Application

A production-ready full-stack todo application with authentication and comprehensive error handling.

## Tech Stack

### Backend
- Node.js + Express + TypeScript
- MongoDB Atlas + Mongoose
- JWT Authentication (access + refresh tokens)
- bcrypt for password hashing
- Zod for validation

### Frontend
- React 18 + TypeScript
- React Router
- Zustand (state management)
- React Query (data fetching)
- React Hook Form
- Tailwind CSS

## Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Setup Environment

**Backend:** Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-secret-key-min-32-characters
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-characters
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend:** Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run the Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Features

- User signup and login
- JWT authentication with refresh tokens
- Password reset functionality
- Create, read, update, delete todos
- Mark todos as complete/incomplete
- User-specific todo lists
- Comprehensive error logging to MongoDB

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/profile` - Get user profile

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle completion

## Project Structure

```
backend/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth, validation, error handling
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── schemas/        # Zod validation
│   ├── utils/          # JWT utilities
│   └── server.ts       # Entry point

frontend/
├── src/
│   ├── api/           # API clients
│   ├── components/    # React components
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Axios setup
│   ├── pages/         # Page components
│   ├── schemas/       # Zod validation
│   ├── store/         # Zustand store
│   ├── types/         # TypeScript types
│   └── App.tsx        # Main app
```

## Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## License

MIT
