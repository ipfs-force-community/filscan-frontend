/** @type {import('next').NextConfig} */
const path = require('path')

const publicPa = process.env['NEXT_PUBLIC_NODE_ENV']
const environment = process.env['NEXT_PUBLIC_environment']

const ossAddress = {
  dev: 'http://localhost:3003/',
  calibration: 'https://filscan-v2.oss-accelerate.aliyuncs.com/filscan-cali',
  mainner: 'https://filscan-v2.oss-accelerate.aliyuncs.com/filscan-test',
}
let publicUrl
if (publicPa && publicPa === 'production' && environment) {
  publicUrl = ossAddress[environment]
}

if (publicPa === 'development') {
  publicUrl = undefined
}

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    APP_ENV: process.env['NEXT_PUBLIC_environment'],
    APP_BASE_URL: process.env['NEXT_PUBLIC_APP_BASE_URL'],
    APP_BASE_URL_PRO: process.env['NEXT_PUBLIC_APP_BASE_URL_PRO'],
    environment: process.env['NEXT_PUBLIC_environment'],
    FVM_URL: process.env['NEXT_PUBLIC_FVM_URL'],
    NET_WORK: process.env['NEXT_PUBLIC_NET_WORK'],
    PORT: process.env['NEXT_PUBLIC_PORT'],
  },
  output: 'standalone',
  assetPrefix: publicUrl,
  i18n: {
    locales: ['zh', 'en', 'kr'],
    defaultLocale: 'zh',
  },
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig
