// Environment validation for production readiness
export const validateEnvironment = () => {
  const requiredEnvVars = ["NEXT_PUBLIC_SITE_URL"];
  const optionalEnvVars = ["NEXT_BUCKET_URL"];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  const missingOptionalVars = optionalEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0 && process.env.NODE_ENV === "production") {
    console.warn(
      `Warning: Missing required environment variables in production: ${missingVars.join(", ")}`
    );
  }

  if (missingOptionalVars.length > 0) {
    console.info(
      `Info: Missing optional environment variables: ${missingOptionalVars.join(", ")}. Using fallback values.`
    );
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
    missingOptionalVars,
  };
};

// Performance monitoring helper
export const performanceMonitor = {
  measureApiCall: async <T>(
    name: string,
    apiCall: () => Promise<T>
  ): Promise<T> => {
    const start = performance.now();
    try {
      const result = await apiCall();
      const duration = performance.now() - start;

      if (duration > 1000) {
        console.warn(
          `Slow API call detected: ${name} took ${duration.toFixed(2)}ms`
        );
      }

      return result;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(
        `API call failed: ${name} after ${duration.toFixed(2)}ms`,
        error
      );
      throw error;
    }
  },

  measureRender: (componentName: string) => {
    if (typeof window !== "undefined" && "performance" in window) {
      const start = performance.now();
      return () => {
        const duration = performance.now() - start;
        if (duration > 100) {
          console.warn(
            `Slow render detected: ${componentName} took ${duration.toFixed(2)}ms`
          );
        }
      };
    }
    return () => {}; // No-op for server-side
  },
};

// Cache configuration
export const cacheConfig = {
  // Static assets cache duration (1 year)
  staticAssets: 31536000,

  // API responses cache duration (1 hour)
  apiResponses: 3600,

  // Page cache duration (30 minutes)
  pages: 1800,

  // Dynamic content cache duration (5 minutes)
  dynamicContent: 300,
} as const;
