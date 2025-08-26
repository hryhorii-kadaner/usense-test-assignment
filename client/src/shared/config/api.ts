import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  metadata?: { retryCount: number };
}

export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

api.interceptors.request.use((config: any) => {
  if (!config.metadata) {
    config.metadata = { retryCount: 0 };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as CustomAxiosRequestConfig;

    const shouldRetry = config &&
      config.metadata &&
      config.metadata.retryCount < 1 &&
      (error.code === 'ECONNABORTED' ||
        error.response?.status === 500 ||
        error.response?.status === 502 ||
        error.response?.status === 503);

    if (shouldRetry && config.metadata) {
      config.metadata.retryCount += 1;
      console.log(`Retrying request (attempt ${config.metadata.retryCount})...`);

      await new Promise(resolve => setTimeout(resolve, 1000));

      return api(config);
    }

    if (error.response?.status === 404 || error.code === 'ECONNABORTED') {
      return {
        data: {
          articles: [],
          totalResults: 0,
          page: 1,
          pageSize: 10
        }
      };
    }

    return Promise.reject(error);
  }
);

export default api;