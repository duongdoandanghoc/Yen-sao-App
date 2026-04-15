import type { NextConfig } from "next";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === "true";

const nextConfig: NextConfig = {
  // Khi build cho mobile app, xuất ra static HTML (không cần server)
  output: isMobile ? "export" : undefined,
  images: {
    // Mobile build không có server nên cần tắt image optimization
    unoptimized: isMobile,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Trailing slash giúp navigation hoạt động tốt trong Capacitor
  trailingSlash: isMobile,
};

export default nextConfig;

