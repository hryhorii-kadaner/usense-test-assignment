# Frontend Application

A modern React application built with TypeScript, providing an intuitive interface for browsing and searching global news.

## 🚀 Features

- **Advanced Search Interface**: Comprehensive search with real-time suggestions
- **Category Navigation**: Intuitive browsing by news categories
- **Advanced Filtering**: Multi-criteria filtering (country, language, date range)
- **Infinite Scrolling**: Smooth pagination for enhanced user experience
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Loading States**: Skeleton loaders and error boundaries
- **Type Safety**: Complete TypeScript implementation

## 🛠 Technology Stack

- **React 18.2** - Modern React with concurrent features
- **TypeScript 5.2** - Static type checking and enhanced developer experience
- **TanStack Query 5.8** - Server state management and caching
- **React Router 6.30** - Client-side routing and navigation
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Vite 4.5** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons
- **Axios 1.6** - HTTP client with interceptors

## 📦 Project Structure

```
client/
├── src/
│   ├── components/           # React components
│   │   ├── features/        # Feature-specific components
│   │   │   ├── news/        # News-related components
│   │   │   └── search/      # Search functionality
│   │   ├── layout/          # Layout components
│   │   └── ui/              # Reusable UI components
│   ├── shared/              # Shared utilities and configurations
│   │   ├── api/             # API layer and data fetching
│   │   │   └── queries/     # TanStack Query configurations
│   │   ├── config/          # Application configuration
│   │   ├── hooks/           # Custom React hooks
│   │   ├── providers/       # React context providers
│   │   ├── routes/          # Route configurations
│   │   ├── types/           # TypeScript type definitions
│   │   ├── ui/              # Shared UI components
│   │   └── utils/           # Utility functions and helpers
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and Tailwind imports
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── vite.config.ts           # Vite build configuration
```

## 🔧 Key Architecture Decisions

### State Management
- **TanStack Query** for server state (caching, synchronization, background updates)
- **React state** for local UI state
- **URL state** for search parameters and navigation

### API Layer
- Centralized API configuration with axios
- Query functions separated from components
- Error handling with retry logic
- Request/response interceptors for logging

### Component Organization
- **Feature-based structure** for better maintainability
- **Shared components** for reusability
- **Custom hooks** for complex logic extraction
- **Provider pattern** for global state

### Type Safety
- Strict TypeScript configuration
- Interface definitions for all API responses
- Type-safe route parameters
- Generic components with proper typing

## 📝 Available Scripts

### Development
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Build Configuration
- **Development**: Hot module replacement, source maps
- **Production**: Code splitting, tree shaking, minification
- **Preview**: Local server for production build testing

## 🔌 API Integration

### Base Configuration
```typescript
// src/shared/config/api.ts
export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});
```

### Query Hooks
```typescript
// Example usage
const { data, isLoading, error } = useSearchArticles(query);
const { data: headlines } = useTopHeadlines(country);
```

### Error Handling
- Network error fallbacks
- Empty state handling
- Retry mechanisms
- User-friendly error messages

## 🎨 Styling Approach

### Tailwind CSS
- Utility-first approach for rapid development
- Custom design system with consistent spacing
- Responsive design patterns
- Dark mode support (if implemented)

### Component Styling
```typescript
// Example component with Tailwind classes
const NewsCard = ({ article }: NewsCardProps) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <img className="w-full h-48 object-cover rounded-t-lg" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2" />
      <p className="text-gray-600 text-sm" />
    </div>
  </div>
);
```

## 🚀 Performance Optimizations

### Code Splitting
- Route-based code splitting
- Component lazy loading
- Dynamic imports for heavy features

### Caching Strategy
- TanStack Query cache management
- Stale-while-revalidate pattern
- Background refetching

### Bundle Optimization
- Tree shaking for unused code elimination
- Asset optimization (images, fonts)
- Gzip compression in production

## 🔧 Development Guidelines

### Component Creation
1. Use functional components with hooks
2. Implement proper TypeScript interfaces
3. Add JSDoc comments for complex components
4. Follow naming conventions (PascalCase for components)

### State Management
1. Keep local state minimal
2. Use TanStack Query for server state
3. Lift state up when needed by multiple components
4. Avoid prop drilling with context providers

### Error Handling
1. Implement error boundaries for component errors
2. Handle API errors gracefully
3. Provide meaningful error messages
4. Include retry mechanisms where appropriate

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up

### Mobile-First Approach
- Base styles for mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interface elements
- Optimized navigation for mobile

## 🧪 Testing Strategy

### Recommended Testing Stack
- **Vitest** for unit testing
- **React Testing Library** for component testing
- **MSW** for API mocking
- **Playwright** for E2E testing

### Test Structure
```
src/
├── components/
│   └── __tests__/       # Component tests
├── shared/
│   ├── hooks/
│   │   └── __tests__/   # Hook tests
│   └── utils/
│       └── __tests__/   # Utility tests
```

## 🚀 Deployment

### Build Process
```bash
npm run build
```
Generates optimized production build in `dist/` directory.

### Environment Variables
No client-side environment variables required - all configuration handled by the backend.

### Static Hosting
The built application can be deployed to any static hosting service:
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🔍 Development Tools

### VSCode Extensions
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Prettier - Code formatter

### Browser Extensions
- React Developer Tools
- TanStack Query Devtools
- Redux DevTools (if using Redux)

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

When contributing to the frontend:

1. Follow existing code style and patterns
2. Add TypeScript types for new features
3. Update component documentation
4. Test responsive design on multiple devices
5. Ensure accessibility standards are met

## 📋 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check TypeScript compilation errors
   - Verify all imports are correct
   - Ensure all environment variables are set

2. **Development Server Issues**
   - Clear node_modules and reinstall dependencies
   - Check port 5173 availability
   - Verify Vite configuration

3. **API Connection Issues**
   - Ensure backend server is running
   - Check proxy configuration in vite.config.ts
   - Verify CORS settings
