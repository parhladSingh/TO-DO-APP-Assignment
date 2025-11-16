# Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier)

## Step 1: MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier M0)
4. Click "Database Access" → Add database user with username and password
5. Click "Network Access" → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
6. Click "Connect" on your cluster → "Connect your application"
7. Copy the connection string

## Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_REFRESH_SECRET=your-different-super-secret-refresh-key-min-32-characters
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

Start backend:
```bash
npm run dev
```

## Step 3: Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

## Step 4: Test the Application

1. Open http://localhost:5173
2. Click "Sign up" to create an account
3. Create some todos!

## Troubleshooting

### MongoDB Connection Failed
- Check your connection string in `backend/.env`
- Verify IP whitelist in MongoDB Atlas (0.0.0.0/0 for development)
- Ensure username and password are correct
- URL-encode special characters in password

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### CORS Errors
- Ensure backend is running before frontend
- Check `FRONTEND_URL` in `backend/.env` matches your frontend URL
