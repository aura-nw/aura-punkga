const { i18n } = require("./next-i18next.config")

module.exports = {
  i18n,
  images: {
    domains: ["d3qkhwzkyp1991.cloudfront.net", "s3-dev.punkga.me"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fbsbx.com",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },
}
