# Backend API Server

A robust Node.js API server built with Express and TypeScript, providing secure and efficient access to global news data through NewsAPI integration.

## 🚀 Features

- **RESTful API Design**: Clean, predictable API endpoints
- **TypeScript Implementation**: Full type safety and enhanced developer experience
- **NewsAPI Integration**: Seamless integration with NewsAPI service
- **Request Validation**: Input validation and sanitization
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Configurable cross-origin resource sharing
- **Environment Configuration**: Flexible environment-based configuration
- **Logging Middleware**: Request/response logging for debugging

## 🛠 Technology Stack

- **Node.js 18+** - JavaScript runtime environment
- **Express.js 4.18** - Fast, minimalist web framework
- **TypeScript 5.2** - Static type checking and modern JavaScript features
- **Axios 1.6** - Promise-based HTTP client with interceptors
- **CORS 2.8** - Cross-origin resource sharing middleware
- **dotenv 16.3** - Environment variable management
- **tsx 4.1** - TypeScript execution engine for development

## 📦 Project Structure

```
server/
├── src/
│   ├── config/              # Application configuration
│   │   ├── index.ts         # Main configuration file
│   │   └── api.ts           # API client configuration
│   ├── controllers/         # Route controllers
│   │   ├── index.ts         # Controller exports
│   │   └── newsController.ts # News API controllers
│   ├── middleware/          # Express middleware
│   │   └── index.ts         # Middleware definitions
│   ├── routes/              # API route definitions
│   │   ├── index.ts         # Route exports
│   │   └── news.ts          # News API routes
│   ├── services/            # Business logic services
│   │   ├── index.ts         # Service exports
│   │   └── newsApiService.ts # NewsAPI service implementation
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Shared interfaces and types
│   ├── utils/               # Utility functions
│   │   ├── index.ts         # Utility exports
│   │   └── date.ts          # Date formatting utilities
│   └── index.ts             # Application entry point
├── dist/                    # Compiled JavaScript output
├── .env                     # Environment variables (local)
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## 🔧 Architecture Overview

### Layered Architecture
```
Client Request
     ↓
Middleware (CORS, Logging, Validation)
     ↓
Routes (Endpoint definitions)
     ↓
Controllers (Request/Response handling)
     ↓
Services (Business logic)
     ↓
External APIs (NewsAPI)
```

### Key Components

#### Configuration Layer
- Environment variable management
- API client setup with interceptors
- CORS and security settings

#### Middleware Layer
- Request logging and monitoring
- Input validation and sanitization
- Error handling and response formatting

#### Service Layer
- NewsAPI integration and data transformation
- Business logic implementation
- Error handling and retry mechanisms

#### Controller Layer
- HTTP request/response handling
- Parameter validation
- Response formatting

## 📝 API Endpoints

### News Search
```http
GET /api/news/search
```

**Query Parameters:**
| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `q` | string | Search keywords | ✓ |
| `pageSize` | number | Articles per page (1-100) | ❌ |
| `page` | number | Page number | ❌ |
| `language` | string | Language code (en, es, fr, etc.) | ❌ |
| `sortBy` | string | Sort by: relevancy, popularity, publishedAt | ❌ |
| `sources` | string | Comma-separated source ids | ❌ |
| `domains` | string | Comma-separated domains | ❌ |
| `excludeDomains` | string | Domains to exclude | ❌ |
| `from` | string | Start date (YYYY-MM-DD) | ❌ |
| `to` | string | End date (YYYY-MM-DD) | ❌ |
| `searchIn` | string | Search in: title, description, content | ❌ |

**Response:**
```json
{
  "articles": [
    {
      "id": "string",
      "title": "string",
      "snippet": "string",
      "url": "string",
      "publishedDate": "string",
      "source": "string",
      "imageUrl": "string",
      "content": "string",
      "author": "string"
    }
  ],
  "totalResults": "number",
  "page": "number",
  "pageSize": "number"
}
```

### Top Headlines
```http
GET /api/news/top-headlines
```

**Query Parameters:**
| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `country` | string | Country code (us, gb, fr, etc.) | ❌ |
| `category` | string | Category (business, technology, etc.) | ❌ |
| `sources` | string | Comma-separated source ids | ❌ |
| `pageSize` | number | Articles per page (1-100) | ❌ |
| `page` | number | Page number | ❌ |

**Response:**
```json
{
  "articles": [
    {
      "id": "string",
      "title": "string",
      "snippet": "string",
      "url": "string",
      "publishedDate": "string",
      "source": "string",
      "imageUrl": "string",
      "content": "string",
      "author": "string"
    }
  ],
  "totalResults": "number"
}
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
NODE_ENV=development
PORT=3001

# NewsAPI Configuration
NEWS_API_KEY=your_newsapi_key_here
NEWS_API_BASE_URL=https://newsapi.org/v2

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Required Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEWS_API_KEY` | NewsAPI authentication key | **Required** |
| `NEWS_API_BASE_URL` | NewsAPI base URL | `https://newsapi.org/v2` |
| `PORT` | Server port number | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |

## 📝 Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm run start        # Start production server
```

### Development Workflow
1. **Development**: `npm run dev` uses `tsx` for hot reloading
2. **Build**: `npm run build` compiles TypeScript to `dist/`
3. **Production**: `npm run start` runs compiled JavaScript

## 🔒 Security Features

### Input Validation
- Query parameter validation using middleware
- Type-safe parameter parsing
- Input sanitization for XSS prevention

### Error Handling
- Structured error responses
- Sensitive information filtering
- Request correlation IDs for debugging

### CORS Configuration
```typescript
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
```

### Rate Limiting (Recommended)
Consider implementing rate limiting for production:
```typescript
// Example: express-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 📊 Logging and Monitoring

### Request Logging
```typescript
// Automatic request logging middleware
app.use(requestLogger);

// Output format:
// 2025-08-26T16:40:18.652Z - GET /api/news/search?q=technology - 127.0.0.1 - Mozilla/5.0...
```

### Error Logging
```typescript
// Structured error logging
{
  message: "Error message",
  stack: "Error stack trace",
  url: "/api/news/search",
  method: "GET",
  timestamp: "2025-08-26T16:40:18.652Z"
}
```

### Performance Monitoring
Consider implementing:
- Response time tracking
- Memory usage monitoring
- External API response time tracking
- Error rate monitoring

## 🧪 Testing Strategy

### Recommended Testing Stack
- **Jest** for unit testing
- **Supertest** for API endpoint testing
- **MSW** for mocking external APIs
- **TypeScript** for type-safe tests

### Test Structure
```
src/
├── controllers/
│   └── __tests__/       # Controller tests
├── services/
│   └── __tests__/       # Service tests
├── middleware/
│   └── __tests__/       # Middleware tests
└── utils/
    └── __tests__/       # Utility tests
```

### Example Test
```typescript
// Example controller test
describe('NewsController', () => {
  test('should return top headlines', async () => {
    const response = await request(app)
      .get('/api/news/top-headlines')
      .query({ country: 'us' })
      .expect(200);

    expect(response.body.articles).toBeDefined();
    expect(Array.isArray(response.body.articles)).toBe(true);
  });
});
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment-Specific Configuration
- **Development**: Full error details, debug logging
- **Production**: Error sanitization, performance optimization
- **Testing**: Mock external dependencies

## 🔧 Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow Express.js best practices
- Implement proper error handling
- Add JSDoc comments for complex functions

### Error Handling Pattern
```typescript
try {
  const result = await someAsyncOperation();
  res.json(result);
} catch (error) {
  console.error('Operation failed:', error);
  next(error); // Pass to error middleware
}
```

### Service Layer Pattern
```typescript
// Service handles business logic
export class NewsApiService {
  async searchNews(params: SearchParams): Promise<Article[]> {
    // Implementation
  }
}

// Controller handles HTTP concerns
export const searchArticles = async (req: Request, res: Response) => {
  const articles = await newsApiService.searchNews(req.query);
  res.json({ articles });
};
```

## 📚 External Dependencies

### NewsAPI Integration
- **Base URL**: `https://newsapi.org/v2`
- **Authentication**: API key in query parameters
- **Rate Limits**: 500 requests per day (free tier)
- **Documentation**: [NewsAPI Docs](https://newsapi.org/docs)

### API Response Transformation
NewsAPI responses are transformed to match application schema:
```typescript
// NewsAPI format → Application format
{
  source: { name: "CNN" },     →  source: "CNN"
  description: "...",          →  snippet: "..."
  publishedAt: "2025-08-26",   →  publishedDate: "2025-08-26"
  urlToImage: "...",           →  imageUrl: "..."
}
```