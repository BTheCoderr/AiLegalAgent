/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
    unoptimized: true // For static export compatibility
  },
  env: {
    CUSTOM_KEY: 'AI_LEGAL_AGENTS_STARTUPS',
  },
  // Enable static export for Netlify deployment
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  distDir: 'out',
}

export default nextConfig 