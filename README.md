# Usense News Application

A modern, full-stack news application built with React and Node.js, providing real-time access to global news through the NewsAPI service.

## 🚀 Features

- **Advanced News Search**: Comprehensive search functionality with keyword filtering
- **Category Navigation**: Browse news by categories (business, technology, health, sports, etc.)
- **Advanced Filtering**: Filter by language, date range, and search scope
- **Infinite Scrolling**: Seamless pagination for enhanced user experience
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Live news data from NewsAPI integration
- **Type Safety**: Full TypeScript implementation across the stack

## 🛠 Technology Stack

### Frontend (`/client`)
- **React 18** with TypeScript
- **TanStack Query** (React Query) for data fetching and caching
- **React Router** for client-side routing
- **Tailwind CSS** for modern styling
- **Vite** for development and build tooling
- **Lucide React** for iconography

### Backend (`/server`)
- **Node.js** with Express.js framework
- **TypeScript** for type safety
- **Axios** for HTTP client with interceptors
- **CORS** for cross-origin resource sharing
- **NewsAPI** integration for news data

## 📦 Project Structure

```
usense-test-assignment/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── shared/         # Shared utilities and configurations
│   │   │   ├── api/        # API layer and queries
│   │   │   ├── hooks/      # Custom React hooks
│   │   │   ├── types/      # TypeScript type definitions
│   │   │   └── utils/      # Helper functions
│   │   └── main.tsx        # Application entry point
├── server/                 # Node.js backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic services
│   │   ├── config/         # Application configuration
│   │   ├── middleware/     # Express middleware
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Utility functions
└── vercel.json            # Vercel deployment configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- NewsAPI key from [newsapi.org](https://newsapi.org/register)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd usense-test-assignment
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**
   ```bash
   # Copy environment template
   cp server/.env.example server/.env
   
   # Edit server/.env and add your NewsAPI key
   NEWS_API_KEY=your_newsapi_key_here
   ```

4. **Start development environment**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📝 Available Scripts

### Development
- `npm run dev` - Start both frontend and backend in development mode
- `npm run client:dev` - Start only frontend development server
- `npm run server:dev` - Start only backend development server

### Production
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start production server with static frontend
- `npm run client:build` - Build frontend only
- `npm run server:build` - Build backend only

### Utilities
- `npm run install:all` - Install dependencies for all packages
- `npm run client:preview` - Preview built frontend
- `npm run server:start` - Start production backend server

## � Configuration

### Environment Variables

The application requires the following environment variables in `server/.env`:

```env
NODE_ENV=development
PORT=3001
NEWS_API_KEY=your_newsapi_key_here
NEWS_API_BASE_URL=https://newsapi.org/v2
CORS_ORIGIN=http://localhost:5173
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/news/search` | GET | Search articles with advanced filters |
| `/api/news/top-headlines` | GET | Retrieve top headlines by category |

### Query Parameters

- `q` - Search keywords
- `category` - News category (business, technology, health, etc.)
- `language` - Language code (en, es, fr, etc.)
- `from` / `to` - Date range (YYYY-MM-DD format)
- `page` - Page number for pagination
- `pageSize` - Number of articles per page

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Import project from GitHub to Vercel
   - Vercel will auto-detect the configuration

2. **Set Environment Variables**
   ```
   NEWS_API_KEY=your_newsapi_key
   NEWS_API_BASE_URL=https://newsapi.org/v2
   NODE_ENV=production
   ```

3. **Deploy**
   - Automatic deployment on git push
   - Frontend served from root domain
   - API available at `/api/*` endpoints

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy frontend** (static files in `client/dist/`)
   ```bash
   # Upload client/dist/ to your static hosting service
   ```

3. **Deploy backend** (Node.js server in `server/dist/`)
   ```bash
   # Deploy server/dist/ to your Node.js hosting service
   ```

## 📖 Documentation

- [Client Documentation](./client/README.md) - Frontend architecture and components
- [Server Documentation](./server/README.md) - Backend API and services
- [Setup Guide](./SETUP.md) - Detailed setup instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hryhorii Kadaner**

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org/) for providing news data
- [Vercel](https://vercel.com/) for deployment platform
- React and Node.js communities for excellent documentation