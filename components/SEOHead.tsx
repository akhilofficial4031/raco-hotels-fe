"use client";

import { NextSeo, NextSeoProps } from "next-seo";
import Head from "next/head";

interface SEOHeadProps extends NextSeoProps {
  structuredData?: object | object[];
}

export default function SEOHead({ structuredData, ...seoProps }: SEOHeadProps) {
  return (
    <>
      <NextSeo {...seoProps} />
      {structuredData ? (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                Array.isArray(structuredData)
                  ? structuredData
                  : [structuredData],
                null,
                0
              ).replace(/</g, "\\u003c"),
            }}
          />
        </Head>
      ) : null}
    </>
  );
}
