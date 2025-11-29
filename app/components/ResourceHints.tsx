/**
 * ResourceHints component
 * Provides DNS prefetch and preconnect hints for external resources
 * This improves performance by establishing connections early
 */
export default function ResourceHints() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  return (
    <>
      {/* DNS prefetch for API endpoint */}
      {!!apiBaseUrl && (
        <>
          <link rel="dns-prefetch" href={apiBaseUrl} />
          <link rel="preconnect" href={apiBaseUrl} crossOrigin="anonymous" />
        </>
      )}

      {/* DNS prefetch for image bucket */}
      {!!bucketUrl && (
        <>
          <link rel="dns-prefetch" href={bucketUrl} />
          <link rel="preconnect" href={bucketUrl} crossOrigin="anonymous" />
        </>
      )}

      {/* Preconnect to common third-party domains */}
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </>
  );
}

