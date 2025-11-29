"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useEffect } from "react";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      // Web vitals logging removed
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === "production") {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
        pathname: window.location.pathname,
      });

      // Send to your analytics endpoint
      // You can replace this with Google Analytics, Vercel Analytics, etc.
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics", body);
      } else {
        fetch("/api/analytics", {
          body,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          keepalive: true,
        }).catch((_error) => {
          // Web vitals error logging removed
        });
      }
    }
  });

  // Also track custom performance metrics
  useEffect(() => {
    if (typeof window !== "undefined" && "performance" in window) {
      // Track Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      if (navigationEntry) {
        const _ttfb =
          navigationEntry.responseStart - navigationEntry.requestStart;
        // TTFB logging removed
      }

      // Track resource timing
      const resources = performance.getEntriesByType("resource");
      const images = resources.filter((r) =>
        r.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)
      ) as PerformanceResourceTiming[];
      const _totalImageSize = images.reduce(
        (acc, img) => acc + (img.transferSize || 0),
        0
      );

      if (images.length > 0) {
        // Image performance logging removed
      }
    }
  }, []);

  return null;
}
