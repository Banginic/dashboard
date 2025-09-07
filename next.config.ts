import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    experimental: {
    turbopack: false // Disable Turbopack entirely
  },
  images : {
    remotePatterns: [
         {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: `res.cloudinary.com`,
        pathname: `/${process.env.CLOUDINARY_CLOUD_NAME}/**`,
      }
    ]
  }
};

export default nextConfig;
