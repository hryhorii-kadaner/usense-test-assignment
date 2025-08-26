import express from 'express';
import cors from 'cors';
import config from './config';
import routes from './routes';
import { requestLogger, errorHandler, notFoundHandler } from './middleware';

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Логирование запросов
app.use(requestLogger);

// Маршруты
app.use('/api', routes);

// Обработка 404
app.use('*', notFoundHandler);

// Обработка ошибок
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

app.listen(config.port, () => {
  console.log('🚀 Server started successfully!');
  console.log(`📍 Environment: ${config.nodeEnv}`);
  console.log(`🌐 Server running on http://localhost:${config.port}`);
  console.log(`📰 NewsAPI endpoints available:`);
  console.log(`   - GET /api/news/search - News search`);
  console.log(`   - GET /api/news/top-headlines - Top headlines`);
  console.log(`   - GET /api/news/article/url/:url - Article details`);
  console.log(`✅ Server ready to accept connections`);
});
