import Script from "next/script";
import { siteConfig } from "@/config/site";

/** Loads the configured analytics provider (GA4 and/or Plausible). Nothing loads when unset. */
export function AnalyticsScripts() {
  const { gaId, plausibleDomain, plausibleHost } = siteConfig.integrations;
  return (
    <>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(gaId)},{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {plausibleDomain && (
        <>
          <Script src={`${plausibleHost}/js/script.tagged-events.js`} data-domain={plausibleDomain} strategy="afterInteractive" />
          <Script id="plausible-init" strategy="afterInteractive">
            {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
          </Script>
        </>
      )}
    </>
  );
}
