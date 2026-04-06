/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub avatar
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google avatar
      },
    ],
  },
};

export default nextConfig;
