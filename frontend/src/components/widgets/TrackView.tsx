"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires a single analytics event when a page mounts (e.g. service or case-study views). */
export function TrackView({ event, props }: { event: AnalyticsEvent; props?: Record<string, string> }) {
  const key = JSON.stringify(props);
  useEffect(() => {
    track(event, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, key]);
  return null;
}
