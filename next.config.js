/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
  images: {
    domains: ['your-supabase-project.supabase.co'],
  },
  // Turbopack 설정 추가
  experimental: {
    turbo: {
      rules: {
        // PWA 관련 설정
        '*.js': {
          loaders: ['next-pwa-loader'],
        },
      },
    },
  },
}

module.exports = withPWA(nextConfig) 
module.exports = {
    trailingSlash: true,
}