const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/forms/:path*",
        headers: [
          {
            key: "CDN-Cache-Control",
            value: "max-age=604800",
          },
          {
            key: "Cloudflare-CDN-Cache-Control",
            value: "max-age=604800",
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;

