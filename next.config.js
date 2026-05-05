/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repoName = 'dbd_website_new'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Serve from /dbd_website_new on GitHub Pages; root path in local dev
  basePath:    isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  // Only treat .tsx/.ts/.jsx/.mdx as pages — avoids picking up legacy Jekyll files
  pageExtensions: ['tsx', 'ts', 'jsx', 'mdx'],
}

module.exports = nextConfig
