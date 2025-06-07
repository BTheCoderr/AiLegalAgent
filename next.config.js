/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com']
  },
  env: {
    CUSTOM_KEY: 'AI_LEGAL_AGENTS_STARTUPS',
  },
}

export default nextConfig 