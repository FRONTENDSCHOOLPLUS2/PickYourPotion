/** @type {import('next').NextConfig} */
module.exports = {
  // eslint-disable-next-line
  async redirects() {
    return [
      {
        source: "/",
        missing: [
          {
            type: "cookie",
            key: "isLandingClose",
            value: "true",
          },
        ],
        permanent: false,
        destination: "/landing",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "api.fesp.shop",
        pathname: "/files/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
        pathname: "**",
      },
    ],
  },
};
