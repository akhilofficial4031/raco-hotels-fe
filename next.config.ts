import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
