import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({ title: "Terms & Conditions", description: "Terms and conditions for using the Phynexora website.", path: "/terms" });

const sections: LegalSection[] = [
  { heading: "About these terms", body: [`These terms govern your use of this website, operated by ${siteConfig.legalName}. By using the website you agree to them. Software development services are provided under separate written agreements, which take precedence over these terms for any project.`] },
  { heading: "Use of the website", body: ["You agree to use the website lawfully and not to:", ["attempt to gain unauthorised access to the website or its systems", "submit spam, malicious code or misleading information", "interfere with the website's operation or security"]] },
  { heading: "Information on this website", body: ["Content on this website is provided for general information about our services. Portfolio entries and case studies marked as samples illustrate the type of work we deliver and do not describe a specific client engagement. Estimates, timelines and features are confirmed only in a written proposal or agreement."] },
  { heading: "Enquiries and communication", body: ["Submitting an enquiry, using the chat assistant or contacting us on WhatsApp does not create a contract. We will respond to enquiries as soon as reasonably possible."] },
  { heading: "Intellectual property", body: ["The website design, text, graphics and brand elements are owned by or licensed to Phynexora. You may not copy or reuse them without permission, except for viewing and sharing links to pages for personal or business reference."] },
  { heading: "Third-party links", body: ["The website may link to third-party services such as WhatsApp or social networks. We are not responsible for their content or practices."] },
  { heading: "Liability", body: ["We work to keep the website accurate and available but cannot guarantee it will always be error-free or uninterrupted. To the extent permitted by law, we are not liable for losses arising from use of the website."] },
  { heading: "Changes", body: ["We may update these terms from time to time. Continued use of the website after changes means you accept the updated terms."] },
  { heading: "Contact", body: [`Questions about these terms can be sent ${siteConfig.contact.email ? `to ${siteConfig.contact.email}` : "through the contact page"}.`] },
];

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" description="The terms that apply when you use the Phynexora website." path="/terms" updated="1 October 2026" sections={sections} />;
}
