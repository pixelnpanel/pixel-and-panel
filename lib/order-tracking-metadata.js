const TRACKING_PAGE_TITLE = "Track Your Order | Pixel & Panel";
const TRACKING_PAGE_DESCRIPTION =
  "View the latest status of your Pixel & Panel order, including proof, production, and delivery updates.";
const TRACKING_SOCIAL_TITLE = "Track Your Pixel & Panel Order";
const TRACKING_SOCIAL_DESCRIPTION =
  "Check your project status, proof approval, production progress, and delivery updates.";
export const TRACKING_OG_IMAGE = {
  // JPEG for the same reason as the default card — see lib/seo.js.
  url: "https://www.pixelnpanel.com/og/order-tracking.jpg",
  width: 1200,
  height: 630,
  alt: "Track Your Order | Pixel & Panel",
};

export function createOrderTrackingMetadata({ alternates, url } = {}) {
  const openGraph = {
    title: TRACKING_SOCIAL_TITLE,
    description: TRACKING_SOCIAL_DESCRIPTION,
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
    images: [TRACKING_OG_IMAGE],
  };

  if (url) {
    openGraph.url = url;
  }

  const metadata = {
    metadataBase: new URL("https://www.pixelnpanel.com"),
    title: {
      absolute: TRACKING_PAGE_TITLE,
    },
    description: TRACKING_PAGE_DESCRIPTION,
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: TRACKING_SOCIAL_TITLE,
      description: TRACKING_SOCIAL_DESCRIPTION,
      images: [
        {
          url: TRACKING_OG_IMAGE.url,
          alt: TRACKING_OG_IMAGE.alt,
        },
      ],
    },
    robots: {
      index: false,
      follow: false,
    },
  };

  if (alternates) {
    metadata.alternates = alternates;
  }

  return metadata;
}
