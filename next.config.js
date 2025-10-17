/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // If using next/image in the future
    unoptimized: true,
  },
  experimental: {
    // Ensure CSS features compile across environments
  },
}

module.exports = nextConfig


