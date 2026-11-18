"use client";

import { useEffect, useRef } from "react";
import { trackProductView } from "@/lib/analytics";

export default function ViewContentTracker({ contentId }) {
  const lastId = useRef(null);
  useEffect(() => {
    if (lastId.current === contentId) return;
    lastId.current = contentId;
    trackProductView();
  }, [contentId]);
  return null;
}
