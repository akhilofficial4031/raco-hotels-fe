/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";

// Dynamically import ReactLenis to avoid SSR issues
const ReactLenis = dynamic(
  () => import("@studio-freight/react-lenis").then((mod) => mod.ReactLenis),
  {
    ssr: false, // Disable server-side rendering for this component
    loading: () => null, // No loading component needed
  }
);

interface SmoothScrollProps {
  children: ReactNode;
}

function SmoothScrolling({ children }: SmoothScrollProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render children directly on server and during hydration
  if (!isClient) {
    return children as React.ReactElement;
  }

  // Only render ReactLenis on the client side after hydration
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children as any}
    </ReactLenis>
  );
}

export default SmoothScrolling;
