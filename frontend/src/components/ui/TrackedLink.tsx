"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEvent;
  eventProps?: Record<string, string>;
  children: ReactNode;
};

/** Plain anchor that records an analytics event when clicked. */
export function TrackedLink({ event, eventProps, onClick, children, href, ...rest }: Props) {
  const external = href ? /^https?:/.test(href) : false;
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      onClick={(e) => {
        track(event, eventProps);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
