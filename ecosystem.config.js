module.exports = {
  apps: [
    {
      name: 'makan-landscape',
      script: 'server.js',
      cwd: '/var/www/makan/.next/standalone',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '127.0.0.1',
      },
      max_memory_restart: '512M',
      error_file: '/var/log/pm2/makan-error.log',
      out_file: '/var/log/pm2/makan-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      watch: false,
    },
  ],
}
