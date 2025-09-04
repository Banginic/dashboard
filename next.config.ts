import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
