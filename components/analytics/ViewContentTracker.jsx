"use client";

import { useEffect } from "react";
import { event } from "@/lib/fpixel";

export default function ViewContentTracker({
  contentName,
  contentCategory,
  contentId,
  value,
  currency = "USD",
}) {
  useEffect(() => {
    const options = {
      content_name: contentName,
      content_category: contentCategory,
      content_ids: [contentId],
      content_type: "product",
      currency,
    };
    // Only live products carry a numeric starting price.
    if (typeof value === "number") options.value = value;
    event("ViewContent", options);
  }, [contentName, contentCategory, contentId, value, currency]);

  return null;
}
