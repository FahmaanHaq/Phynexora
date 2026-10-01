/**
 * PORTFOLIO & CASE STUDIES
 * ------------------------------------------------------------------
 * The entries below are SAMPLE entries describing the kind of work
 * Phynexora delivers. They intentionally contain no client names,
 * statistics or business results.
 *
 * To publish real projects: replace an entry, set `isSample: false`,
 * add real screenshots to /public/portfolio and set `images`.
 * `results` stays `null` until verified results are approved by the client.
 */

export type PortfolioCategory = "ERP" | "POS" | "Web" | "Mobile" | "Custom Software";
export type MockupVariant = "erp" | "pos" | "web" | "mobile" | "analytics" | "workflow";

export type Project = {
  slug: string;
  name: string;
  category: PortfolioCategory;
  industry: string;
  description: string;
  technologies: string[];
  features: string[];
  mockup: MockupVariant;
  /** Optional real screenshots in /public. When empty, a UI mockup is rendered. */
  images?: { src: string; alt: string }[];
  isSample: boolean;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string[];
  solution: string[];
  keyFeatures: { title: string; text: string }[];
  technology: string[];
  screenshots: { mockup: MockupVariant; caption: string; src?: string }[];
  implementation: { phase: string; text: string }[];
  /** Verified, client-approved outcomes only. `null` renders a placeholder. */
  results: string[] | null;
  isSample: boolean;
};

export const portfolioCategories: ("All" | PortfolioCategory)[] = ["All", "ERP", "POS", "Web", "Mobile", "Custom Software"];

export const projects: Project[] = [
  {
    slug: "plantation-workforce-erp",
    name: "Workforce & Payroll ERP",
    category: "ERP",
    industry: "Agriculture",
    description:
      "An ERP for a large agricultural operation covering employee records, daily attendance, rule-based payroll and management reporting across multiple estates.",
    technologies: ["ASP.NET Core", "React", "SQL Server", "Azure"],
    features: ["Multi-estate employee management", "Attendance and work allocation", "Rule-based payroll", "Salary and statutory reports"],
    mockup: "erp",
    isSample: true,
  },
  {
    slug: "retail-pos-accounting",
    name: "Retail POS & Accounting",
    category: "POS",
    industry: "Retail",
    description:
      "A point-of-sale and accounting system for a multi-outlet retailer, connecting counter sales, stock and the accounting ledger in one platform.",
    technologies: ["React", "ASP.NET Core", "SQL Server"],
    features: ["Barcode-based billing", "Multi-outlet stock", "Customer credit accounts", "Integrated accounting"],
    mockup: "pos",
    isSample: true,
  },
  {
    slug: "recruitment-management-system",
    name: "Recruitment Management System",
    category: "Custom Software",
    industry: "Professional Services",
    description:
      "A management system for a recruitment agency that tracks candidates, job orders, documentation and placement stages from application to deployment.",
    technologies: ["ASP.NET Core", "React", "SQL Server", "REST APIs"],
    features: ["Candidate pipeline", "Document tracking", "Job order management", "Stage-based workflows"],
    mockup: "workflow",
    isSample: true,
  },
  {
    slug: "operations-dashboard",
    name: "Operations Dashboard",
    category: "Web",
    industry: "Manufacturing",
    description:
      "A web-based management dashboard consolidating production, inventory and sales data from existing systems into a single view for managers.",
    technologies: ["React", "TypeScript", "ASP.NET Core", "SQL Server"],
    features: ["Consolidated KPIs", "Drill-down reports", "Role-based dashboards", "Scheduled exports"],
    mockup: "analytics",
    isSample: true,
  },
  {
    slug: "corporate-website",
    name: "Corporate Website & CMS",
    category: "Web",
    industry: "Professional Services",
    description:
      "A fast, SEO-ready company website with a content management panel, enquiry forms and analytics, designed to generate qualified leads.",
    technologies: ["Next.js", "TypeScript", "ASP.NET Core"],
    features: ["Responsive design", "Content management", "Enquiry workflow", "SEO and analytics"],
    mockup: "web",
    isSample: true,
  },
  {
    slug: "field-team-app",
    name: "Field Team Mobile App",
    category: "Mobile",
    industry: "Logistics",
    description:
      "A mobile app for field staff to receive assignments, record visits, capture photos and sync data with the central system — including offline use.",
    technologies: ["React Native", "ASP.NET Core", "Azure"],
    features: ["Task assignments", "Offline data capture", "Photo and signature capture", "Real-time sync"],
    mockup: "mobile",
    isSample: true,
  },
];

const placeholderImplementation = [
  { phase: "Discovery", text: "Workshops with stakeholders to map current processes, pain points and reporting needs." },
  { phase: "Phase 1 delivery", text: "Core modules built, tested with key users and launched." },
  { phase: "Roll-out", text: "Data migration, user training and go-live support." },
  { phase: "Ongoing", text: "Maintenance and continued improvements based on user feedback." },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "plantation-workforce-erp",
    client: "Workforce & Payroll ERP",
    industry: "Agriculture",
    summary: "Replacing spreadsheet-based attendance and payroll with a connected ERP across multiple estates.",
    challenge: [
      "Attendance and work records were kept in separate spreadsheets for each location and consolidated manually at month end.",
      "Payroll rules — allowances, deductions and work-based pay — were complex and applied by hand, making the process slow and difficult to verify.",
    ],
    solution: [
      "A web-based ERP with a shared employee master, daily attendance and work allocation captured at each location.",
      "A configurable payroll engine applying the organisation's own rules, with approval steps and full audit history.",
    ],
    keyFeatures: [
      { title: "Employee master", text: "Single record for every employee across locations." },
      { title: "Attendance & work allocation", text: "Daily capture with validation rules." },
      { title: "Payroll engine", text: "Configurable earnings and deduction rules." },
      { title: "Reports", text: "Salary, statutory and management reports." },
    ],
    technology: ["ASP.NET Core", "React", "SQL Server", "Azure"],
    screenshots: [
      { mockup: "erp", caption: "Management dashboard (illustrative mockup)" },
      { mockup: "analytics", caption: "Payroll reporting (illustrative mockup)" },
    ],
    implementation: placeholderImplementation,
    results: null,
    isSample: true,
  },
  {
    slug: "retail-pos-accounting",
    client: "Retail POS & Accounting",
    industry: "Retail",
    summary: "One connected system for counter sales, outlet stock and accounting.",
    challenge: [
      "Sales were recorded in a standalone POS while stock and accounts were maintained separately, causing mismatched figures.",
      "Management had limited visibility into daily performance across outlets.",
    ],
    solution: [
      "A POS with a fast, touch-friendly billing screen connected to a central back office.",
      "Sales automatically update outlet stock and post to the accounting ledger.",
    ],
    keyFeatures: [
      { title: "Fast billing", text: "Barcode scanning, discounts, returns and receipts." },
      { title: "Outlet stock", text: "Real-time stock and transfers between outlets." },
      { title: "Customer accounts", text: "Credit customers and purchase history." },
      { title: "Accounting", text: "Sales, receivables and ledgers in one place." },
    ],
    technology: ["React", "ASP.NET Core", "SQL Server"],
    screenshots: [
      { mockup: "pos", caption: "POS billing screen (illustrative mockup)" },
      { mockup: "analytics", caption: "Sales reporting (illustrative mockup)" },
    ],
    implementation: placeholderImplementation,
    results: null,
    isSample: true,
  },
  {
    slug: "recruitment-management-system",
    client: "Recruitment Management System",
    industry: "Professional Services",
    summary: "Tracking every candidate from application to placement in one workflow.",
    challenge: [
      "Candidate information, documents and job orders were spread across files, email and spreadsheets.",
      "It was difficult to see where each candidate stood and which documents were outstanding.",
    ],
    solution: [
      "A stage-based workflow system covering candidates, job orders, documentation and placement.",
      "Role-based dashboards showing pipeline status and outstanding actions.",
    ],
    keyFeatures: [
      { title: "Candidate pipeline", text: "Clear stages with ownership and history." },
      { title: "Documents", text: "Upload, verify and track required documents." },
      { title: "Job orders", text: "Manage vacancies and match candidates." },
      { title: "Reporting", text: "Pipeline and placement reports." },
    ],
    technology: ["ASP.NET Core", "React", "SQL Server", "REST APIs"],
    screenshots: [
      { mockup: "workflow", caption: "Candidate pipeline (illustrative mockup)" },
      { mockup: "erp", caption: "Operations dashboard (illustrative mockup)" },
    ],
    implementation: placeholderImplementation,
    results: null,
    isSample: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function hasCaseStudy(slug: string) {
  return caseStudies.some((c) => c.slug === slug);
}
