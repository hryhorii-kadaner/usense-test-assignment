import axios, { AxiosInstance, AxiosError } from 'axios';
import config from '../config';

/**
 * Axios instance for NewsAPI
 */
class ApiClient {
    private static instance: AxiosInstance;

    static getInstance(): AxiosInstance {
        if (!ApiClient.instance) {
            ApiClient.instance = ApiClient.createInstance();
        }
        return ApiClient.instance;
    }

    private static createInstance(): AxiosInstance {
        const instance = axios.create({
            baseURL: config.newsApiBaseUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        instance.interceptors.request.use(
            (config) => {
                if (!config.params) {
                    config.params = {};
                }
                config.params.apiKey = process.env.NEWS_API_KEY;
                
                console.log(`NewsAPI Request: ${config.method?.toUpperCase()} ${config.url}`, {
                    params: { ...config.params, apiKey: '[HIDDEN]' }
                });

                return config;
            },
            (error) => {
                console.error('Request interceptor error:', error);
                return Promise.reject(error);
            }
        );

        instance.interceptors.response.use(
            (response) => {
                console.log(`NewsAPI Response: ${response.status}`, {
                    articlesCount: response.data?.articles?.length || 0,
                    totalResults: response.data?.totalResults || 0
                });
                return response;
            },
            (error: AxiosError) => {
                ApiClient.handleError(error);
                return Promise.reject(error);
            }
        );

        return instance;
    }

    private static handleError(error: AxiosError): void {
        if (error.response) {
            console.error('NewsAPI Error Response:', {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data
            });
        } else if (error.request) {
            // Request was made but no response received
            console.error('NewsAPI Network Error:', error.message);
        } else {
            // Configuration error
            console.error('NewsAPI Request Error:', error.message);
        }
    }
}


export const buildQueryParams = (params: Record<string, any>): Record<string, string> => {
    const queryParams: Record<string, string> = {};
    
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            queryParams[key] = String(value);
        }
    });
    
    return queryParams;
};

export const isAxiosError = axios.isAxiosError;
export const newsApiClient = ApiClient.getInstance();