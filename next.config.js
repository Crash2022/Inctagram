const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))
        config.resolve.fallback = { fs: false }
        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: /url/ },
                use: ['@svgr/webpack']
            }
        )
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.yandexcloud.net',
                port: '',
                pathname: '/users-inctagram/users/**'
            }
        ]
    },
    // images: {
    //     domains: ['storage.yandexcloud.net']
    // },
    i18n
    // i18n: {
    //     defaultLocale: 'en',
    //     locales: ['en', 'ru']
    // }
}

module.exports = nextConfig
