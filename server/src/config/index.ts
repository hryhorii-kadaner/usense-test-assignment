import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '../../.env') });
  if (!process.env.NEWS_API_KEY) {
    dotenv.config({ path: path.join(__dirname, '../../../.env') });
  }
}

interface Config {
  port: number;
  nodeEnv: string;
  newsApiKey: string;
  corsOrigin: string;
  newsApiBaseUrl: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  newsApiKey: process.env.NEWS_API_KEY || '',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  newsApiBaseUrl: process.env.NEWS_API_BASE_URL || 'https://newsapi.org/v2'
};

const requiredEnvVars = ['NEWS_API_KEY'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export default config;
