import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Environment variables for SEO
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://raco-hotels.com",
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-11201a01c0de4768a1eb0c759b0f5b14.r2.dev",
      },
      {
        protocol: "http",
        hostname: "localhost",
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
