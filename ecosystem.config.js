module.exports = {
  apps: [
    {
      name: 'usense-server',
      script: './server/dist/index.js',
      cwd: './',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      detached: true,
      windowsHide: true,
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
        NEWS_API_KEY: 'your_api_key_here',
        NEWS_API_BASE_URL: 'https://newsapi.org/v2',
        CORS_ORIGIN: 'http://localhost:5173'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        NEWS_API_KEY: 'your_api_key_here',
        NEWS_API_BASE_URL: 'https://newsapi.org/v2',
        CORS_ORIGIN: 'https://your-domain.vercel.app'
      },
      error_file: './logs/server-error.log',
      out_file: './logs/server-out.log',
      log_file: './logs/server-combined.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 2000,
      max_restarts: 5,
      min_uptime: '5s'
    },
    {
      name: 'usense-client',
      script: './start-client.js',
      cwd: './',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      detached: true,
      windowsHide: true,
      env: {
        NODE_ENV: 'development',
        PORT: 5173
      },
      env_production: {
        NODE_ENV: 'production'
      },
      error_file: './logs/client-error.log',
      out_file: './logs/client-out.log',
      log_file: './logs/client-combined.log',
      time: true,
      max_memory_restart: '512M',
      restart_delay: 2000,
      max_restarts: 5,
      min_uptime: '5s'
    }
  ]
};
