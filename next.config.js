/** @type {import('next').NextConfig} */
const nextConfig = {
  // 환경에 따른 조건부 설정
  ...(process.env.NODE_ENV === 'production' && {
    // 정적 배포를 위한 설정 (프로덕션 빌드 시에만)
    output: 'export',
    trailingSlash: true,
    distDir: 'out',
  }),
  
  // 이미지 최적화 설정
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  
  // 환경변수 설정
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  },

  // TypeScript 및 ESLint 설정
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig