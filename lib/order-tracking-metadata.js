const TRACKING_PAGE_TITLE = "Track Your Order | Pixel & Panel";
const TRACKING_PAGE_DESCRIPTION =
  "View the latest status of your Pixel & Panel order, including proof, production, and delivery updates.";
const TRACKING_SOCIAL_TITLE = "Track Your Pixel & Panel Order";
const TRACKING_SOCIAL_DESCRIPTION =
  "Check your project status, proof approval, production progress, and delivery updates.";
const TRACKING_OG_IMAGE = {
  url: "/og/order-tracking.png",
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
