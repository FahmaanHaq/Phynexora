import type { IconName } from "@/lib/icons";

export const valuePoints: { title: string; text: string; icon: IconName }[] = [
  { title: "Built Around Your Business", text: "Solutions designed around your actual workflow.", icon: "target" },
  { title: "Modern Technology", text: "Built using reliable and modern development technologies.", icon: "cpu" },
  { title: "Scalable Solutions", text: "Systems designed to grow with your business.", icon: "trending" },
  { title: "Connected Systems", text: "Integrations that connect your business ecosystem.", icon: "network" },
  { title: "Continuous Support", text: "Ongoing maintenance, improvements and technical support.", icon: "support" },
];

export const solutions: {
  slug: string;
  title: string;
  text: string;
  icon: IconName;
  details: string;
  examples: string[];
  services: { label: string; href: string }[];
}[] = [
  {
    slug: "business-management",
    title: "Business Management",
    text: "Centralize operations and improve visibility.",
    icon: "dashboard",
    details:
      "Bring departments, processes and data into one system so managers can see what is happening and teams spend less time chasing information.",
    examples: ["Centralised operations dashboard", "Multi-branch management", "Approvals and audit trails", "Role-based access for every team"],
    services: [{ label: "ERP Systems", href: "/services/erp" }, { label: "Custom Software", href: "/services/custom-software" }],
  },
  {
    slug: "sales-retail",
    title: "Sales & Retail",
    text: "Manage sales, products, customers and inventory.",
    icon: "bag",
    details:
      "Sell faster at the counter and online, keep stock accurate across outlets and understand which products and customers drive the business.",
    examples: ["POS for single or multiple outlets", "E-commerce connected to stock", "Customer accounts and history", "Sales and margin reporting"],
    services: [{ label: "POS Systems", href: "/services/pos" }, { label: "Web Development", href: "/services/web-development" }],
  },
  {
    slug: "workforce-management",
    title: "Workforce Management",
    text: "Manage employees, attendance, workflows and reporting.",
    icon: "users",
    details:
      "Handle employee records, attendance, leave and payroll according to your own rules — with mobile access for teams that are not at a desk.",
    examples: ["Attendance and leave tracking", "Rule-based payroll calculation", "Mobile check-in for field teams", "Workforce reports"],
    services: [{ label: "ERP Systems", href: "/services/erp" }, { label: "Mobile Apps", href: "/services/mobile-apps" }],
  },
  {
    slug: "data-reporting",
    title: "Data & Reporting",
    text: "Turn business data into useful information.",
    icon: "chart",
    details:
      "Consolidate data from different systems, clean it up and present it in reports and dashboards that answer the questions you actually ask.",
    examples: ["Management dashboards", "Scheduled reports", "Data consolidation across systems", "Exports for finance and audit"],
    services: [{ label: "Custom Software", href: "/services/custom-software" }, { label: "Integrations", href: "/services/integrations" }],
  },
  {
    slug: "automation",
    title: "Automation",
    text: "Reduce repetitive manual processes.",
    icon: "workflow",
    details:
      "Identify the repetitive steps in your workflows and automate them — from data transfers and notifications to document processing with AI.",
    examples: ["Automated data transfers", "Document and invoice processing", "Notification and reminder workflows", "AI-assisted customer responses"],
    services: [{ label: "AI & Automation", href: "/services/ai-automation" }, { label: "Integrations", href: "/services/integrations" }],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    text: "Modernize existing business systems and workflows.",
    icon: "refresh",
    details:
      "Move from paper, spreadsheets or ageing software to modern, connected systems — in manageable phases that keep the business running.",
    examples: ["Legacy system modernisation", "Paper-to-digital workflows", "Cloud migration", "Phased roll-out with training"],
    services: [{ label: "Custom Software", href: "/services/custom-software" }, { label: "ERP Systems", href: "/services/erp" }],
  },
];

export const industries: { name: string; icon: IconName; text: string }[] = [
  { name: "Retail", icon: "bag", text: "POS, stock and customer systems" },
  { name: "Agriculture", icon: "sprout", text: "Workforce, payroll and estate operations" },
  { name: "Manufacturing", icon: "factory", text: "Production, inventory and costing" },
  { name: "Restaurants & Hospitality", icon: "restaurant", text: "Orders, billing and reservations" },
  { name: "Education", icon: "education", text: "Student, course and admin systems" },
  { name: "Healthcare", icon: "health", text: "Appointments, records and billing" },
  { name: "Logistics", icon: "truck", text: "Tracking, dispatch and field apps" },
  { name: "E-commerce", icon: "cart", text: "Online stores and order processing" },
  { name: "Professional Services", icon: "briefcase", text: "Clients, cases, projects and billing" },
  { name: "Small & Medium Businesses", icon: "building", text: "Practical systems that grow with you" },
];

export const comparison = {
  traditional: ["Manual processes", "Disconnected systems", "Repeated data entry", "Limited visibility", "Time-consuming reports"],
  phynexora: ["Connected systems", "Automated workflows", "Centralized information", "Real-time visibility", "Smarter reporting"],
};

export const processSteps: { number: string; title: string; text: string; icon: IconName; outputs: string[] }[] = [
  { number: "01", title: "Discover", text: "Understand the business, users, challenges and requirements.", icon: "search", outputs: ["Stakeholder conversations", "Workflow mapping", "Requirement summary"] },
  { number: "02", title: "Plan", text: "Define features, architecture, technology and project roadmap.", icon: "compass", outputs: ["Feature scope", "Architecture & tech choices", "Timeline and milestones"] },
  { number: "03", title: "Design", text: "Create intuitive interfaces and user experiences.", icon: "design", outputs: ["User flows", "Interface designs", "Clickable prototypes"] },
  { number: "04", title: "Develop", text: "Build the solution using modern technologies.", icon: "code", outputs: ["Iterative builds", "Regular demos", "Version-controlled code"] },
  { number: "05", title: "Test", text: "Test functionality, security, performance and usability.", icon: "test", outputs: ["Functional & regression tests", "Security checks", "User acceptance testing"] },
  { number: "06", title: "Launch", text: "Deploy the system and assist with implementation.", icon: "rocket", outputs: ["Deployment", "Data migration", "Training & handover"] },
  { number: "07", title: "Support", text: "Continue improving, maintaining and supporting the solution.", icon: "support", outputs: ["Monitoring", "Maintenance & fixes", "Ongoing improvements"] },
];

export const whyPhynexora: { title: string; text: string; icon: IconName }[] = [
  { title: "Business First", text: "We understand the business problem before deciding on the technology.", icon: "briefcase" },
  { title: "Built For You", text: "Solutions are customized around your requirements.", icon: "puzzle" },
  { title: "Scalable", text: "Architecture designed to support future growth.", icon: "trending" },
  { title: "Modern", text: "Built using modern technologies and development practices.", icon: "cpu" },
  { title: "Connected", text: "Integrate your systems instead of creating disconnected solutions.", icon: "network" },
  { title: "Long-Term Support", text: "We continue supporting and improving your solution after launch.", icon: "handshake" },
];

export const techGroups: { title: string; description: string; items: { name: string; short: string }[] }[] = [
  {
    title: "Backend",
    description: "Reliable, secure services and business logic.",
    items: [
      { name: ".NET", short: ".N" },
      { name: "ASP.NET Core", short: "AS" },
      { name: "C#", short: "C#" },
      { name: "Node.js", short: "No" },
      { name: "REST APIs", short: "{}" },
    ],
  },
  {
    title: "Frontend",
    description: "Fast, accessible interfaces for web and mobile.",
    items: [
      { name: "React", short: "Re" },
      { name: "JavaScript", short: "JS" },
      { name: "TypeScript", short: "TS" },
    ],
  },
  {
    title: "Data & Cloud",
    description: "Well-structured data, hosted with care.",
    items: [
      { name: "SQL Server", short: "SQ" },
      { name: "PostgreSQL", short: "Pg" },
      { name: "Azure", short: "Az" },
      { name: "Git", short: "Gi" },
    ],
  },
  {
    title: "Intelligence",
    description: "Applied where it adds real value.",
    items: [
      { name: "AI", short: "AI" },
      { name: "Machine Learning", short: "ML" },
    ],
  },
];

/** Brand message used on the About page. */
export const brandPillars = [
  { title: "We understand your business.", text: "Every project starts with how your business works today, where time is lost and what needs to change." },
  { title: "We design the solution.", text: "We shape the right combination of systems, interfaces and integrations — and explain the trade-offs plainly." },
  { title: "We build the technology.", text: "We develop with modern, proven technologies, demoing progress regularly so there are no surprises." },
  { title: "We help you move forward.", text: "After launch we stay involved: supporting users, maintaining the system and improving it as you grow." },
];
