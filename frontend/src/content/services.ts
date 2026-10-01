import type { IconName } from "@/lib/icons";

/**
 * Service content. Structured so it can be moved to the backend / admin
 * panel later without changing components (see lib/api/content.ts).
 */
export type ServiceDetail = {
  slug: string;
  title: string;
  /** Short label used in menus, chips and the chatbot. */
  label: string;
  icon: IconName;
  summary: string;
  heroTitle: string;
  heroText: string;
  overview: string[];
  features: { title: string; text: string }[];
  benefits: string[];
  goodFor: string[];
  deliverables: string[];
  tech: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

export const servicePages: ServiceDetail[] = [
  {
    slug: "erp",
    title: "Custom ERP Systems",
    label: "ERP Systems",
    icon: "dashboard",
    summary:
      "Build customized ERP platforms to manage business operations, employees, inventory, finance, workflows, reporting and more.",
    heroTitle: "ERP systems shaped around how your business actually runs.",
    heroText:
      "We design and build ERP platforms that bring operations, people, inventory and finance into one connected system — modelled on your processes, not a generic template.",
    overview: [
      "Most businesses outgrow spreadsheets and disconnected tools long before they find an ERP that fits. Off-the-shelf products often force teams to change the way they work, or require expensive customisation that never quite matches reality.",
      "We start with your workflows — how orders move, how approvals happen, how people are paid, what managers need to see — and build an ERP around them. Modules are delivered in phases, so your team starts using the system early and it grows with the business.",
    ],
    features: [
      { title: "Operations & workflows", text: "Configurable approval flows, task routing and status tracking for the processes unique to your business." },
      { title: "HR, payroll & attendance", text: "Employee records, attendance, leave, allowances, deductions and payroll calculations that follow your rules." },
      { title: "Inventory & procurement", text: "Stock levels, transfers, purchase orders, suppliers and goods received across one or many locations." },
      { title: "Finance & accounting", text: "Invoicing, receivables, payables, expenses and ledgers with the controls your accountants expect." },
      { title: "Reporting & dashboards", text: "Operational and management reports, exports and live dashboards built around the numbers you track." },
      { title: "Roles & permissions", text: "Granular access control so each user sees and does only what their role requires, with audit history." },
    ],
    benefits: [
      "One source of truth for operational data",
      "Less repeated data entry between departments",
      "Faster, more reliable reporting",
      "Processes enforced consistently by the system",
      "A platform that can be extended module by module",
    ],
    goodFor: ["Multi-department organisations", "Businesses with complex payroll or attendance rules", "Companies replacing spreadsheets or legacy software", "Multi-branch or multi-company operations"],
    deliverables: ["Requirement and process analysis", "Module roadmap and architecture", "Web-based ERP application", "User roles and access control", "Data migration from existing systems", "Training, documentation and support"],
    tech: ["ASP.NET Core", "C#", "React", "SQL Server", "Azure", "REST APIs"],
    faqs: [
      { question: "Can the ERP be delivered in phases?", answer: "Yes. We usually recommend it. We prioritise the modules that remove the most manual work first, launch them, and continue with the next phase while your team is already using the system." },
      { question: "Can you migrate data from our current system or spreadsheets?", answer: "Yes. Data migration is planned as part of the project. We map your existing data, clean it where needed and import it before go-live." },
      { question: "Will the ERP work across multiple branches?", answer: "It can. Multi-branch, multi-location and multi-company structures are planned into the data model from the start when your business needs them." },
    ],
    related: ["pos", "integrations", "custom-software"],
  },
  {
    slug: "pos",
    title: "POS Systems",
    label: "POS Systems",
    icon: "store",
    summary: "Modern point-of-sale systems for retail, restaurants, stores and other businesses.",
    heroTitle: "Point-of-sale systems that keep the counter fast and the back office accurate.",
    heroText:
      "From a single store to multiple outlets, we build POS systems that handle sales, stock, customers and reporting — connected to the rest of your business.",
    overview: [
      "A POS system has two jobs: make every sale quick and simple for staff, and give the business accurate information about stock, cash and performance. Many systems do one well and the other poorly.",
      "We build POS solutions with a fast, touch-friendly selling screen and a proper back office behind it. Your POS can stand alone or connect to accounting, inventory and ERP systems so data does not have to be re-entered.",
    ],
    features: [
      { title: "Fast sales screen", text: "Barcode scanning, quick product search, discounts, returns and receipts designed for speed at the counter." },
      { title: "Inventory", text: "Real-time stock updates on every sale, low-stock alerts, transfers and stock counts across outlets." },
      { title: "Customers", text: "Customer profiles, purchase history, credit accounts and loyalty options where they make sense." },
      { title: "Products & pricing", text: "Variants, categories, price lists, promotions and tax rules managed from one place." },
      { title: "Payments", text: "Cash, card and split payments, day-end closing and cash reconciliation." },
      { title: "Reports & users", text: "Sales, margin and stock reports with cashier roles, shift tracking and permissions." },
    ],
    benefits: ["Shorter queues and fewer billing errors", "Accurate stock at every outlet", "Clear daily sales and cash visibility", "Connected to accounting instead of re-keyed", "Built around your products and pricing rules"],
    goodFor: ["Retail stores", "Restaurants and cafés", "Multi-outlet businesses", "Wholesale and distribution counters"],
    deliverables: ["POS application", "Back-office management portal", "Receipt and invoice templates", "Hardware integration (printers, scanners)", "Reports and exports", "Staff training"],
    tech: ["React", "ASP.NET Core", "SQL Server", "REST APIs", "Azure"],
    faqs: [
      { question: "Can the POS work with our existing hardware?", answer: "In most cases, yes. We support common receipt printers, barcode scanners and cash drawers, and confirm compatibility during planning." },
      { question: "Can it connect to our accounting system?", answer: "Yes. We can integrate the POS with your accounting or ERP system, or build accounting features into the POS back office." },
      { question: "Does it support multiple outlets?", answer: "Yes. Outlets can share products and pricing while keeping separate stock, cashiers and reports." },
    ],
    related: ["erp", "integrations", "web-development"],
  },
  {
    slug: "web-development",
    title: "Websites & Web Applications",
    label: "Web Development",
    icon: "globe",
    summary: "Professional business websites, e-commerce platforms and web applications built around your goals and workflows.",
    heroTitle: "Websites and web applications that do real work for your business.",
    heroText:
      "We build fast, well-structured business websites, online stores and custom web applications — designed to earn trust, convert visitors and support the way your team operates.",
    overview: [
      "A business website should explain what you do clearly, load quickly, be easy to find on search engines and make it simple for people to contact you. A web application should make a specific job faster and more reliable for the people who use it.",
      "We handle both. Business websites and e-commerce platforms are designed for clarity and conversion. Web applications — portals, dashboards, booking systems, internal tools — are designed around your users and the tasks they repeat every day.",
    ],
    features: [
      { title: "Business websites", text: "Clear, responsive websites with strong structure, SEO foundations and contact flows that convert visitors into enquiries." },
      { title: "E-commerce platforms", text: "Online stores with product management, payments, order processing and stock integration." },
      { title: "Web applications", text: "Customer portals, booking systems, internal tools and dashboards built around specific workflows." },
      { title: "Content management", text: "Admin panels that let your team update services, products, articles and pages without a developer." },
      { title: "Performance & SEO", text: "Fast loading, semantic markup, structured data and accessibility built in from the start." },
      { title: "Hosting & deployment", text: "Cloud deployment, SSL, backups and monitoring so your site stays available and secure." },
    ],
    benefits: ["A credible first impression online", "More enquiries from the right visitors", "Content your team can update", "Fast, accessible experience on every device", "A foundation that can grow into a platform"],
    goodFor: ["Businesses establishing a professional presence", "Companies selling online", "Teams that need a portal or internal tool", "Organisations replacing an outdated website"],
    deliverables: ["Site structure and content plan", "UI/UX design", "Responsive website or web app", "Admin / CMS where needed", "SEO and analytics setup", "Deployment and handover"],
    tech: ["Next.js", "React", "TypeScript", "ASP.NET Core", "Node.js", "PostgreSQL", "SQL Server"],
    faqs: [
      { question: "Can we update the website content ourselves?", answer: "Yes. When content changes often, we include an admin panel or CMS so your team can manage pages, services, products or articles." },
      { question: "Will the website be mobile friendly?", answer: "Every site we build is designed for mobile, tablet and desktop from the start — not shrunk down afterwards." },
      { question: "Do you help with domain, hosting and email?", answer: "Yes. We can advise on and set up domains, hosting, SSL and business email, or work with your existing providers." },
    ],
    related: ["mobile-apps", "custom-software", "integrations"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Applications",
    label: "Mobile Apps",
    icon: "mobile",
    summary: "Mobile applications that connect businesses, employees and customers.",
    heroTitle: "Mobile apps that put your business in your customers' and teams' hands.",
    heroText:
      "We build iOS and Android applications for customers, field teams and managers — connected to the systems your business already runs on.",
    overview: [
      "Mobile apps work best when they solve a clear problem: letting customers order or book easily, giving field staff the information they need on site, or giving managers visibility while they are away from a desk.",
      "We design apps around those moments, keep them simple to use and connect them securely to your backend, ERP or POS so information stays consistent everywhere.",
    ],
    features: [
      { title: "Customer apps", text: "Ordering, booking, loyalty, account management and notifications for your customers." },
      { title: "Field & employee apps", text: "Attendance, task lists, data collection, photos and approvals for teams working on the move." },
      { title: "Manager dashboards", text: "Key figures, alerts and approvals available on a phone." },
      { title: "Offline support", text: "Capture data where connectivity is poor and sync when the connection returns." },
      { title: "Push notifications", text: "Timely, relevant updates for users without overwhelming them." },
      { title: "Secure backend", text: "Authenticated APIs connected to your existing systems and data." },
    ],
    benefits: ["Information available where work happens", "Less paperwork for field teams", "A direct channel to your customers", "Data that flows straight into your systems"],
    goodFor: ["Businesses with field or remote staff", "Customer-facing service businesses", "Companies extending an ERP or POS to mobile"],
    deliverables: ["App UX and interface design", "iOS and Android apps", "Backend APIs", "App store publishing support", "Analytics and crash reporting", "Ongoing updates"],
    tech: ["React Native", "TypeScript", "ASP.NET Core", "REST APIs", "Azure"],
    faqs: [
      { question: "Do you build for both iOS and Android?", answer: "Yes. We typically use a cross-platform approach so one codebase serves both platforms, which keeps development and maintenance efficient." },
      { question: "Can the app connect to our existing system?", answer: "Yes. We build or extend APIs so the app reads and writes data from your existing ERP, POS or database." },
      { question: "Do you help publish to the app stores?", answer: "Yes. We prepare store listings and guide the submission process for the Apple App Store and Google Play." },
    ],
    related: ["web-development", "integrations", "erp"],
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    label: "Custom Software",
    icon: "code",
    summary:
      "Software built specifically for unique business requirements that cannot be handled effectively by off-the-shelf products.",
    heroTitle: "When off-the-shelf software doesn't fit, we build what does.",
    heroText:
      "Some processes are too specific for a standard product. We design and develop custom software around your exact requirements — and keep it maintainable for the long term.",
    overview: [
      "Businesses often reach a point where they are working around their software instead of with it: exporting to spreadsheets, keeping side systems, or doing steps manually because the product cannot handle them.",
      "Custom software removes those workarounds. We document how the process should work, design a system around it and build it with an architecture that is secure, testable and easy to extend.",
    ],
    features: [
      { title: "Business management systems", text: "Systems for managing clients, cases, jobs, contracts, bookings or any process specific to your industry." },
      { title: "Modernising legacy systems", text: "Rebuilding or gradually replacing older software while keeping data and business rules intact." },
      { title: "Database solutions", text: "Well-designed databases, reporting layers and data clean-up for reliable information." },
      { title: "Cloud solutions", text: "Cloud-hosted applications with backups, monitoring and room to scale." },
      { title: "Document & workflow tools", text: "Generation of documents, letters and forms from structured data, with approval steps." },
      { title: "Maintenance & support", text: "Ongoing improvements, fixes, monitoring and support after launch." },
    ],
    benefits: ["Software that matches your process exactly", "No licence fees for features you don't use", "You own a system built for your future needs", "Fewer manual workarounds"],
    goodFor: ["Specialised industries", "Businesses with unique workflows", "Teams replacing legacy or in-house tools", "Ideas that need a working product"],
    deliverables: ["Requirement specification", "Architecture and data design", "Application development", "Automated tests", "Deployment and documentation", "Support plan"],
    tech: [".NET", "C#", "React", "TypeScript", "SQL Server", "PostgreSQL", "Azure"],
    faqs: [
      { question: "We only have an idea. Can you help?", answer: "Yes. We help shape the idea into clear requirements, recommend a sensible first version and build from there." },
      { question: "Who owns the software you build?", answer: "Ownership terms are agreed in the project contract. In most custom development projects, the client owns the delivered application." },
      { question: "Can you take over an existing system someone else built?", answer: "Often, yes. We review the codebase first and give you an honest assessment of whether to maintain, improve or rebuild it." },
    ],
    related: ["erp", "ai-automation", "integrations"],
  },
  {
    slug: "ai-automation",
    title: "AI & Business Automation",
    label: "AI & Automation",
    icon: "sparkles",
    summary: "Use AI and automation to reduce repetitive work, improve workflows and provide intelligent business solutions.",
    heroTitle: "Practical AI and automation that removes repetitive work.",
    heroText:
      "We apply automation and AI where they make a measurable difference — processing documents, routing work, answering common questions and turning data into useful insight.",
    overview: [
      "A lot of business time is spent on repetitive tasks: copying data between systems, preparing the same reports, answering the same questions, checking documents. These are often the best place to start with automation.",
      "We look at your workflows first, identify the steps worth automating and choose the simplest reliable approach — sometimes a scheduled workflow, sometimes an AI model, often a combination with a person reviewing the result.",
    ],
    features: [
      { title: "Workflow automation", text: "Scheduled jobs, triggers and rules that move data and tasks between systems automatically." },
      { title: "Document processing", text: "Extracting information from invoices, forms and documents into structured data." },
      { title: "AI assistants", text: "Chat assistants for customers or staff, grounded in your own information and connected to your systems." },
      { title: "Intelligent search", text: "Find information across documents and records using natural language." },
      { title: "Reporting automation", text: "Reports and summaries generated and delivered on schedule." },
      { title: "Human-in-the-loop", text: "Review and approval steps wherever accuracy or accountability matters." },
    ],
    benefits: ["Less time on repetitive tasks", "Fewer manual data-entry errors", "Faster response to customers", "Staff focused on higher-value work"],
    goodFor: ["Teams handling high volumes of documents", "Businesses with repetitive reporting", "Customer service teams", "Operations with many manual hand-offs"],
    deliverables: ["Automation opportunity review", "Proof of concept", "Production automation or AI feature", "Monitoring and safeguards", "Documentation and training"],
    tech: ["AI / LLMs", "Machine Learning", "ASP.NET Core", "Node.js", "Azure", "REST APIs"],
    faqs: [
      { question: "Is our data safe when using AI?", answer: "Data handling is planned up front. We choose providers and configurations that meet your privacy requirements, keep credentials on the server and avoid sending more data than a task needs." },
      { question: "Do we need a lot of data to use AI?", answer: "Not always. Many useful AI features work with your existing documents and records. We will tell you honestly if a problem is better solved without AI." },
      { question: "Can automation work with our current software?", answer: "Usually, yes — through APIs, database integration or file-based exchanges, depending on what your systems support." },
    ],
    related: ["integrations", "custom-software", "erp"],
  },
  {
    slug: "integrations",
    title: "API & System Integrations",
    label: "Integrations",
    icon: "network",
    summary: "Connect existing systems, databases, APIs and third-party platforms into a unified ecosystem.",
    heroTitle: "Connect your systems so information flows where it's needed.",
    heroText:
      "We build APIs and integrations that link your ERP, POS, website, accounting, payment and third-party platforms — so data is entered once and stays consistent.",
    overview: [
      "Most businesses run several systems that do not talk to each other. The result is re-keying, mismatched figures and time spent reconciling information that should already agree.",
      "We design integrations that are reliable and maintainable: well-documented APIs, clear data ownership, error handling, retries and logging so you know when something needs attention.",
    ],
    features: [
      { title: "API development", text: "Secure, documented REST APIs that expose your data and processes to other systems and apps." },
      { title: "Third-party integrations", text: "Payment gateways, accounting software, messaging, logistics and other external platforms." },
      { title: "System-to-system sync", text: "Keeping ERP, POS, e-commerce and CRM data consistent across platforms." },
      { title: "Database integration", text: "Connecting to existing databases, data warehouses and reporting tools." },
      { title: "Reliability", text: "Queues, retries, idempotency and alerts so integrations recover gracefully from failures." },
      { title: "Monitoring & logs", text: "Visibility into what was sent, what failed and why." },
    ],
    benefits: ["Data entered once, used everywhere", "Consistent figures across systems", "Fewer reconciliation tasks", "Freedom to add new tools without silos"],
    goodFor: ["Businesses running several disconnected systems", "Companies adding e-commerce or mobile channels", "Teams that rely on manual exports and imports"],
    deliverables: ["Integration architecture", "APIs and connectors", "API documentation", "Monitoring and alerting", "Support and maintenance"],
    tech: ["REST APIs", "ASP.NET Core", "Node.js", "SQL Server", "PostgreSQL", "Azure"],
    faqs: [
      { question: "Can you integrate with software that doesn't have an API?", answer: "Sometimes. Depending on the system, we may use database-level integration, file exchanges or other approaches. We assess this early in the project." },
      { question: "What happens if an integration fails?", answer: "We build in retries, error logging and alerts so failed transfers are visible and can be resolved without losing data." },
      { question: "Can you document our APIs for other developers?", answer: "Yes. APIs are delivered with documentation so your team or partners can use them confidently." },
    ],
    related: ["erp", "pos", "ai-automation"],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((s) => s.slug === slug);
}

/** The eight "What We Build" cards on the homepage. */
export const homeServices: {
  title: string;
  icon: IconName;
  text: string;
  href: string;
  cta: string;
  points?: string[];
  featured?: boolean;
}[] = [
  {
    title: "ERP Systems",
    icon: "dashboard",
    text: "Build customized ERP platforms to manage business operations, employees, inventory, finance, workflows, reporting and more.",
    href: "/services/erp",
    cta: "Explore ERP Solutions",
    points: ["Operations", "HR & Payroll", "Inventory", "Finance", "Reporting"],
    featured: true,
  },
  {
    title: "POS Systems",
    icon: "store",
    text: "Modern point-of-sale systems for retail, restaurants, stores and other businesses.",
    href: "/services/pos",
    cta: "Explore POS Systems",
    points: ["Sales", "Inventory", "Customers", "Products", "Payments", "Reports", "User management"],
    featured: true,
  },
  { title: "Business Websites", icon: "globe", text: "Professional websites designed to establish a strong digital presence and convert visitors into customers.", href: "/services/web-development", cta: "Learn more" },
  { title: "Web Applications", icon: "layers", text: "Custom web applications designed around specific business workflows and requirements.", href: "/services/web-development", cta: "Learn more" },
  { title: "Mobile Applications", icon: "mobile", text: "Mobile applications that connect businesses, employees and customers.", href: "/services/mobile-apps", cta: "Learn more" },
  { title: "Custom Software", icon: "code", text: "Software built specifically for unique business requirements that cannot be handled effectively by off-the-shelf products.", href: "/services/custom-software", cta: "Learn more" },
  { title: "AI & Automation", icon: "sparkles", text: "Use AI and automation to reduce repetitive work, improve workflows and provide intelligent business solutions.", href: "/services/ai-automation", cta: "Learn more" },
  { title: "API & System Integrations", icon: "network", text: "Connect existing systems, databases, APIs and third-party platforms into a unified ecosystem.", href: "/services/integrations", cta: "Learn more" },
];

/** Full list of capabilities shown on /services. */
export const allCapabilities: { title: string; icon: IconName; text: string; href: string }[] = [
  { title: "Custom ERP Systems", icon: "dashboard", text: "Operations, HR, inventory and finance in one platform.", href: "/services/erp" },
  { title: "POS Systems", icon: "store", text: "Fast selling screens with a proper back office.", href: "/services/pos" },
  { title: "Business Management Systems", icon: "briefcase", text: "Systems for clients, jobs, cases, bookings and contracts.", href: "/services/custom-software" },
  { title: "Web Applications", icon: "layers", text: "Portals, dashboards and internal tools.", href: "/services/web-development" },
  { title: "Business Websites", icon: "globe", text: "Clear, fast websites that generate enquiries.", href: "/services/web-development" },
  { title: "E-commerce Platforms", icon: "cart", text: "Online stores connected to stock and orders.", href: "/services/web-development" },
  { title: "Mobile Applications", icon: "mobile", text: "iOS and Android apps for customers and teams.", href: "/services/mobile-apps" },
  { title: "Custom Software Development", icon: "code", text: "Software for requirements products can't meet.", href: "/services/custom-software" },
  { title: "API Development", icon: "cable", text: "Secure, documented APIs for your data and processes.", href: "/services/integrations" },
  { title: "System Integrations", icon: "network", text: "Connect ERP, POS, accounting and third-party tools.", href: "/services/integrations" },
  { title: "Business Automation", icon: "workflow", text: "Remove repetitive, manual steps from workflows.", href: "/services/ai-automation" },
  { title: "AI-Powered Solutions", icon: "sparkles", text: "Assistants, document processing and smart search.", href: "/services/ai-automation" },
  { title: "Database Solutions", icon: "database", text: "Database design, optimisation and reporting layers.", href: "/services/custom-software" },
  { title: "Cloud Solutions", icon: "cloud", text: "Cloud hosting, deployment, backups and scaling.", href: "/services/custom-software" },
  { title: "Software Maintenance & Support", icon: "support", text: "Ongoing improvements, fixes and technical support.", href: "/contact" },
];

export const serviceOptions = [
  "ERP System",
  "POS System",
  "Business Website",
  "E-commerce Platform",
  "Web Application",
  "Mobile Application",
  "Custom Software",
  "AI & Automation",
  "API & System Integration",
  "Database / Cloud Solution",
  "Maintenance & Support",
  "Not sure yet",
] as const;
