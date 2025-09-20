/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://raco-hotels.com",
  generateRobotsTxt: true, // (optional) generate robots.txt
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: [
    "/admin/*",
    "/api/*",
    "/server-sitemap.xml", // This is our custom sitemap for dynamic content
  ],
  additionalPaths: async () => {
    // Fetch all hotel slugs for dynamic sitemap
    try {
      // We'll create a custom function to get hotels
      const hotels = await getHotelsForSitemap();

      return hotels.map((hotel) => ({
        loc: `/hotels/${hotel.slug}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: hotel.updatedAt || new Date().toISOString(),
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching hotels for sitemap:", error);
      return [];
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    additionalSitemaps: [
      "https://raco-hotels.com/server-sitemap.xml", // For server-side generated content
    ],
  },
  transform: async (config, path) => {
    // Custom function to modify sitemap entries
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};

// Function to fetch hotels for sitemap generation
async function getHotelsForSitemap() {
  try {
    // In a real scenario, you'd fetch from your API
    // For now, we'll return an empty array and handle this in the server-side sitemap
    return [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch hotels for sitemap:", error);
    return [];
  }
}
