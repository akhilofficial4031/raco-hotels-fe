import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Environment variables for SEO
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "https://raco-hotels.com",
  },

  // Image optimization
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Experimental features for better SEO
  experimental: {
    optimizeCss: true,
  },
};

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare")
    .then(({ initOpenNextCloudflareForDev }) => {
      initOpenNextCloudflareForDev();
    })
    .catch(() => {
      // Fail silently if the import fails
    });
}

export default nextConfig;
