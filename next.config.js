/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
    i18n: {
    locales: ['zh', 'en', 'kr'],
    defaultLocale: 'zh',
    localePath: path.resolve('./i18n'),
  },
}

module.exports = nextConfig
