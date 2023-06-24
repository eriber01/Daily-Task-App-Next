/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactRoot: 'concurrent',
    reactConcurrentMode: true,
    reactRefresh: true,
    root: 'src',
    appDir: 'true'
  }
}

module.exports = nextConfig
