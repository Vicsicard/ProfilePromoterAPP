/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  pageExtensions: ['js', 'jsx'],
  distDir: '.next-pages'
}

module.exports = nextConfig
