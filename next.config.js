/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
   env: {
     APP_ENV:process.env['NEXT_PUBLIC_environment'],
     APP_BASE_URL: process.env['NEXT_PUBLIC_APP_BASE_URL'],
     environment: process.env['NEXT_PUBLIC_environment'],
    FVM_URL: process.env['NEXT_PUBLIC_FVM_URL'],
     NET_WORK:process.env['NEXT_PUBLIC_NET_WORK'],
     PORT: process.env['NEXT_PUBLIC_PORT'],
  },
    i18n: {
    locales: ['zh', 'en', 'kr'],
    defaultLocale: 'zh',
    localePath: path.resolve('./i18n'),
  },
}

module.exports = nextConfig
