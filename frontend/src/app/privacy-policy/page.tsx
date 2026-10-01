import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({ title: "Privacy Policy", description: "How Phynexora collects, uses and protects personal information shared through this website.", path: "/privacy-policy" });

const contact = siteConfig.contact.email ? `by email at ${siteConfig.contact.email}` : "through the contact page";

const sections: LegalSection[] = [
  { heading: "Who we are", body: [`This website is operated by ${siteConfig.legalName} ("Phynexora", "we", "us"). This policy explains what personal information we collect through the website, how we use it and the choices you have.`] },
  { heading: "Information we collect", body: [
    "We collect information you choose to give us, including when you:",
    ["submit a project enquiry (name, company, email, WhatsApp number, country, industry, service, budget, timeline, project description and any attachment)", "use the chat assistant (the details and messages you enter)", "submit feedback (name, company, rating and comments)", "contact us by WhatsApp, email or phone"],
    "We also collect limited technical information such as IP address, browser type and pages visited, used for security, spam prevention and — where enabled — aggregated analytics.",
  ] },
  { heading: "How we use information", body: [["To respond to your enquiry and discuss your project", "To provide, maintain and support our services", "To review and, with your permission, publish feedback", "To protect the website against spam and misuse", "To understand how the website is used and improve it"], "We do not sell your personal information."] },
  { heading: "Feedback and testimonials", body: ["Feedback is reviewed by our team before publication. We only publish feedback where you have given permission, and we may publish your name, company and role alongside it. You can ask us to remove published feedback at any time."] },
  { heading: "Sharing", body: ["We share information only with service providers that help us operate the website and our business (for example hosting, email and spam-protection providers), under appropriate confidentiality obligations, or where required by law. When you choose to contact us on WhatsApp, your messages are also subject to WhatsApp's own privacy policy."] },
  { heading: "Cookies and analytics", body: ["The website uses only the storage needed to function (for example remembering your light/dark theme preference). If analytics is enabled, it is used to understand overall usage and is configured to minimise personal data."] },
  { heading: "Retention and security", body: ["We keep enquiry and feedback information only as long as needed for the purposes above or as required by law. We use reasonable technical and organisational measures to protect information, including encrypted connections, access controls and server-side validation."] },
  { heading: "Your rights", body: [`You may ask to access, correct or delete the personal information we hold about you, or object to its use. Contact us ${contact} and we will respond within a reasonable time.`] },
  { heading: "Changes", body: ["We may update this policy from time to time. The latest version will always be available on this page with the date it was last updated."] },
];

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" description="How we collect, use and protect information you share with us." path="/privacy-policy" updated="1 October 2026" sections={sections} />;
}
