/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.fesp.shop",
        port: "",
        pathname: "/files/**",
      },
    ],
  },
};

export default nextConfig;
