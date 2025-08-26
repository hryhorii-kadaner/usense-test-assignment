import type { Request, Response, NextFunction } from 'express';
import { getCurrentTimestamp } from '../utils';

/**
 * Middleware для логирования запросов
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = getCurrentTimestamp();
  const method = req.method;
  const url = req.originalUrl;
  const userAgent = req.get('User-Agent') || '';
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`${timestamp} - ${method} ${url} - ${ip} - ${userAgent}`);
  
  next();
};

/**
 * Middleware для обработки ошибок
 */
export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', {
    message: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    timestamp: getCurrentTimestamp()
  });

  const status = error.status || 500;
  const message = error.message || 'Internal server error';

  res.status(status).json({
    error: message,
    timestamp: getCurrentTimestamp(),
    path: req.originalUrl
  });
};

/**
 * Middleware для обработки 404
 */
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: getCurrentTimestamp()
  });
};

/**
 * Middleware для валидации параметров запроса
 */
export const validateQueryParams = (allowedParams: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const queryKeys = Object.keys(req.query);
    const invalidParams = queryKeys.filter(key => !allowedParams.includes(key));

    if (invalidParams.length > 0) {
      return res.status(400).json({
        error: 'Invalid query parameters',
        invalidParams,
        allowedParams
      });
    }

    next();
  };
};
