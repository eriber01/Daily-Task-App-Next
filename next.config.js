/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactRoot: 'concurrent',
    reactConcurrentMode: true,
    reactRefresh: true,
    root: 'src'
  }
}

module.exports = nextConfig
