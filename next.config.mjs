/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['default', 'zh', 'en'],
        defaultLocale: 'default',
        localeDetection: false,
      },
};

export default nextConfig;
