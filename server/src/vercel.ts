import express from 'express';
import cors from 'cors';
import config from './config';
import routes from './routes';
import { requestLogger, errorHandler, notFoundHandler } from './middleware';

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://usense-test-assignment.vercel.app', 'https://*.vercel.app']
    : config.corsOrigin,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(requestLogger);
}

app.use('/api', routes);
app.use('*', notFoundHandler);
app.use(errorHandler);

export default app;