const { i18n } = require('./next-i18next.config')

module.exports = {
  basePath: '/',
  i18n,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['d3qkhwzkyp1991.cloudfront.net', 's3-dev.punkga.me', 'nft.aurascan.io', 's3.punkga.me'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.fbsbx.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
    unoptimized: true,
  },
}
