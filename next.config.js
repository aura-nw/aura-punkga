const { i18n } = require('./next-i18next.config')

module.exports = {
    i18n: {
      locales: ['default', 'en', 'vn'],
      defaultLocale: 'default',
      localeDetection: false,
    },
    trailingSlash: true,
  }