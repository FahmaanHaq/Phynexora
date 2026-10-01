/**
 * BLOG
 * Articles are stored as structured blocks so they can later be served from
 * the backend / admin panel (or replaced with MDX) without changing the UI.
 * Review these starter articles before launch and set real authors and dates.
 */

export const blogCategories = [
  "Software",
  "ERP",
  "POS",
  "Business Technology",
  "AI",
  "Automation",
  "Web Development",
  "Digital Transformation",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  date: string; // ISO
  readingMinutes: number;
  /** Optional image in /public; otherwise a branded generated cover is shown. */
  coverImage?: { src: string; alt: string };
  coverTone: "blue" | "violet" | "cyan";
  content: Block[];
};

export const posts: BlogPost[] = [
  {
    slug: "signs-your-business-needs-a-custom-erp",
    title: "Signs Your Business Is Ready for a Custom ERP",
    excerpt:
      "Spreadsheets and separate tools work well — until they don't. Here are the practical signals that it's time to bring operations into one system.",
    category: "ERP",
    author: "Phynexora Team",
    date: "2026-10-01",
    readingMinutes: 6,
    coverTone: "blue",
    content: [
      { type: "p", text: "Most businesses don't start with an ERP. They start with spreadsheets, an accounting package and a few tools that solve immediate problems. That's sensible. The question is when that setup starts costing more time than it saves." },
      { type: "h2", text: "1. The same data is entered more than once" },
      { type: "p", text: "If an order is typed into a sales sheet, then into the stock file, then into accounting, every step is a chance for an error — and a few minutes of someone's day. Repeated data entry is usually the first and clearest signal." },
      { type: "h2", text: "2. Month-end takes days instead of hours" },
      { type: "p", text: "When reports depend on collecting files from different people and reconciling them by hand, closing the month becomes a project. A connected system produces most of these figures as a by-product of daily work." },
      { type: "h2", text: "3. Your rules live in people's heads" },
      { type: "p", text: "Payroll allowances, approval limits, pricing exceptions — if only one or two people know how they work, the business is exposed. An ERP turns those rules into configuration the system applies consistently." },
      { type: "h2", text: "4. Managers can't see what's happening today" },
      { type: "p", text: "If answering \"how much stock do we have?\" or \"what did we sell yesterday?\" requires a phone call, decisions are being made on old information." },
      { type: "h2", text: "Why custom rather than off-the-shelf?" },
      { type: "p", text: "Off-the-shelf ERPs are a good fit when your processes are standard. When they aren't — unusual payroll rules, industry-specific workflows, multi-company structures — a custom ERP avoids bending the business to fit the software." },
      { type: "ul", items: ["Start with the modules that remove the most manual work.", "Deliver in phases so people use the system early.", "Plan integrations with existing tools from the start.", "Keep reporting requirements in view from day one."] },
      { type: "quote", text: "The goal isn't more software. It's less time spent working around the software you have." },
      { type: "p", text: "If several of these signs sound familiar, it's worth a conversation about what a phased ERP could look like for your business." },
    ],
  },
  {
    slug: "choosing-a-pos-system-checklist",
    title: "Choosing a POS System: A Practical Checklist",
    excerpt:
      "A POS should make every sale quick and every report accurate. Use this checklist before committing to a system.",
    category: "POS",
    author: "Phynexora Team",
    date: "2026-10-01",
    readingMinutes: 5,
    coverTone: "cyan",
    content: [
      { type: "p", text: "A point-of-sale system sits at the centre of a retail or hospitality business. It needs to be fast for staff, accurate for the back office and flexible enough to match how you sell." },
      { type: "h2", text: "At the counter" },
      { type: "ul", items: ["Can staff find and bill products quickly, including by barcode?", "Are discounts, returns and split payments simple to handle?", "Does it keep working if the internet connection drops?", "Is the screen easy to learn for new staff?"] },
      { type: "h2", text: "In the back office" },
      { type: "ul", items: ["Does every sale update stock in real time?", "Can you manage multiple outlets, price lists and promotions?", "Are cashier shifts and day-end cash reconciliation built in?", "Can you see sales, margin and stock reports without exporting to spreadsheets?"] },
      { type: "h2", text: "Connections" },
      { type: "p", text: "Ask how the POS will exchange data with accounting, e-commerce and any ERP you use. Re-keying sales into another system defeats much of the purpose." },
      { type: "h2", text: "Ownership and support" },
      { type: "p", text: "Understand who maintains the system, how updates are delivered and what support looks like during trading hours. For a business-critical system, responsive support matters as much as features." },
    ],
  },
  {
    slug: "where-automation-actually-helps",
    title: "Where Business Automation Actually Helps",
    excerpt:
      "Automation and AI are most useful in specific, repetitive steps. Here's how to find the right starting points.",
    category: "Automation",
    author: "Phynexora Team",
    date: "2026-10-01",
    readingMinutes: 5,
    coverTone: "violet",
    content: [
      { type: "p", text: "Automation projects succeed when they target a clear, repetitive task — not when they try to automate everything at once. The best candidates are usually hiding in plain sight." },
      { type: "h2", text: "Look for repetition" },
      { type: "p", text: "Ask your team which tasks they do every day or every week in the same way: copying data between systems, preparing the same report, sending the same reminders. These are prime candidates." },
      { type: "h2", text: "Look for hand-offs" },
      { type: "p", text: "Every time work moves from one person or system to another, there's a delay and a risk of something being missed. Automated routing and notifications can remove much of that friction." },
      { type: "h2", text: "Where AI fits" },
      { type: "p", text: "AI is helpful when the input is unstructured — documents, emails, free-text questions. Extracting fields from invoices or answering common customer questions are practical examples. For high-stakes decisions, keep a person reviewing the result." },
      { type: "ol", items: ["List repetitive tasks and estimate the time they take.", "Pick one with clear inputs and outputs.", "Automate it, measure the effect and gather feedback.", "Expand to the next task."] },
      { type: "p", text: "Small, well-chosen automations compound. A few hours saved each week across a team adds up quickly — and builds confidence for larger improvements." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function relatedPosts(post: BlogPost, limit = 3) {
  const same = posts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = posts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...others].slice(0, limit);
}
