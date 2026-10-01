export type Faq = { question: string; answer: string; category: "General" | "Services" | "Projects" | "Support" };

export const faqs: Faq[] = [
  {
    category: "General",
    question: "What type of software does Phynexora build?",
    answer:
      "We build business software: custom ERP systems, POS systems, business management systems, websites, web applications, e-commerce platforms, mobile apps, APIs and integrations, and AI or automation features. Most of our work is tailored to the specific way a business operates.",
  },
  {
    category: "Services",
    question: "Do you develop custom ERP systems?",
    answer:
      "Yes. We design ERP systems around your processes — operations, HR and payroll, inventory, finance and reporting — and usually deliver them in phases so your team can start using the most important modules early.",
  },
  {
    category: "Services",
    question: "Can you build a POS system for my business?",
    answer:
      "Yes. We build POS systems for retail stores, restaurants and other businesses, including sales, inventory, customers, payments, reporting and user management. They can work on their own or connect to your accounting or ERP system.",
  },
  {
    category: "Services",
    question: "Do you develop business websites?",
    answer:
      "Yes. We build fast, mobile-friendly business websites with clear structure, SEO foundations and simple ways for visitors to contact you. If you need to update content yourself, we include an admin panel.",
  },
  {
    category: "Services",
    question: "Can you integrate with our existing software?",
    answer:
      "In most cases, yes. We connect systems through APIs, database integration or file-based exchanges depending on what your current software supports. We review your systems early so we can confirm the best approach.",
  },
  {
    category: "Support",
    question: "Do you provide maintenance and support?",
    answer:
      "Yes. After launch we offer ongoing maintenance, monitoring, fixes, user support and continued improvements. Support arrangements are agreed based on how critical the system is to your operations.",
  },
  {
    category: "Projects",
    question: "Can you improve or modernize an existing system?",
    answer:
      "Yes. We can review an existing system and recommend whether to improve it, extend it or gradually replace it. Modernisation is usually done in stages so your business keeps running throughout.",
  },
  {
    category: "Projects",
    question: "How long does software development take?",
    answer:
      "It depends on scope. A business website may take a few weeks, while an ERP or custom platform is usually delivered in phases over several months. After understanding your requirements, we give you a realistic timeline with clear milestones.",
  },
  {
    category: "Projects",
    question: "How do I start a project with Phynexora?",
    answer:
      "Send us a project enquiry or message us on WhatsApp with a short description of what you need. We'll arrange a conversation to understand your requirements, then share a proposed approach, timeline and estimate.",
  },
];
