# Development Setup Guide

A comprehensive guide for setting up the Usense News Application development environment.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **Git** for version control
- **NewsAPI Account** ([Register here](https://newsapi.org/register))

## 🚀 Quick Setup

### 1. Repository Setup

```bash
# Clone the repository
git clone <repository-url>
cd usense-test-assignment

# Install all dependencies
npm run install:all
```

### 2. Environment Configuration

#### Backend Environment Setup
Create environment file for the server:

```bash
# Copy the environment template
cp server/.env.example server/.env
```

Edit `server/.env` with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=3001

# NewsAPI Configuration (REQUIRED)
NEWS_API_KEY=your_actual_newsapi_key_here
NEWS_API_BASE_URL=https://newsapi.org/v2

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

#### Obtaining NewsAPI Key

1. Visit [NewsAPI Registration](https://newsapi.org/register)
2. Create a free account
3. Copy your API key from the dashboard
4. Replace `your_actual_newsapi_key_here` in the `.env` file

### 3. Development Server Launch

```bash
# Start both frontend and backend simultaneously
npm run dev
```

This command will:
- Start the backend server on `http://localhost:3001`
- Start the frontend development server on `http://localhost:5173`
- Enable hot reloading for both applications

### 4. Verification

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api/news/top-headlines?country=us

## 🔧 Development Commands

### Full Stack Development

```bash
# Start both frontend and backend (recommended)
npm run dev

# Build entire application for production
npm run build

# Start production servers
npm run start
```

### Individual Component Development

```bash
# Frontend only
npm run client:dev      # Development server
npm run client:build    # Production build
npm run client:preview  # Preview production build

# Backend only  
npm run server:dev      # Development server with hot reload
npm run server:build    # Compile TypeScript
npm run server:start    # Start production server
```

### Utility Commands

```bash
# Install dependencies for all packages
npm run install:all

# Clean installation (if issues occur)
rm -rf node_modules client/node_modules server/node_modules
npm run install:all
```

## 🔍 Troubleshooting

### Common Setup Issues

#### 1. Environment Variables Not Working
- Verify `.env` file is in the `server/` directory (not root)
- Check for spaces around the `=` sign: `KEY=value` (not `KEY = value`)
- Restart the development server after changes

#### 2. NewsAPI Key Issues
```bash
# Test your API key directly
curl "https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY"
```

#### 3. Port Conflicts
If ports 3001 or 5173 are already in use, modify ports in the configuration or kill existing processes.

#### 4. Dependencies Installation Fails
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules
npm run install:all
```

## ✅ Setup Verification Checklist

- [ ] Node.js 18+ installed
- [ ] All dependencies installed successfully
- [ ] NewsAPI key obtained and configured
- [ ] Backend server starts without errors
- [ ] Frontend development server starts
- [ ] API endpoints respond correctly
- [ ] Frontend can fetch data from backend

Once all items are checked, your development environment is ready! 🎉