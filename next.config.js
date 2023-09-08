/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {

  reactStrictMode: true,
  env: {
    APP_ENV:process.env['NEXT_PUBLIC_environment'],
    APP_BASE_URL: process.env['NEXT_PUBLIC_APP_BASE_URL'],
    APP_BASE_URL_PRO: process.env['NEXT_PUBLIC_APP_BASE_URL_PRO'],
    environment: process.env['NEXT_PUBLIC_environment'],
    FVM_URL: process.env['NEXT_PUBLIC_FVM_URL'],
    NET_WORK:process.env['NEXT_PUBLIC_NET_WORK'],
    PORT: process.env['NEXT_PUBLIC_PORT'],
  },
  i18n: {
    locales: ['zh', 'en', 'kr'],
    defaultLocale: 'zh',
  },
  images: {
    domains: ['filscan-v2.oss-cn-hongkong.aliyuncs.com','filscan-v2.oss-accelerate.aliyuncs.com'],
  },
}

module.exports = nextConfig
