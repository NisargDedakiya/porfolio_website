import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/about", destination: "/" },
      { source: "/skills", destination: "/" },
      { source: "/projects", destination: "/" },
      { source: "/progression", destination: "/" },
      { source: "/bug-bounty", destination: "/" },
      { source: "/certifications", destination: "/" },
      { source: "/research", destination: "/" },
      { source: "/contact", destination: "/" },
    ];
  },
};

export default nextConfig;
