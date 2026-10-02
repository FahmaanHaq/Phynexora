# Phynexora — Website & API

**Technology That Makes Business Easier.**

Production-ready company website for Phynexora: a Next.js frontend and an ASP.NET Core 8 API.

```
phynexora/
├── frontend/            Next.js 16 (App Router) · TypeScript · Tailwind CSS 4
│   ├── src/app/         Pages, API route handlers (/api/*), sitemap, robots, OG image
│   ├── src/components/  layout · sections · cards · forms · widgets · ui · mockups
│   ├── src/content/     All page content (services, portfolio, case studies, FAQ, blog…)
│   ├── src/config/      site.ts — the ONE place for contact details & integrations
│   └── src/lib/         api client, chat engine, validation, analytics, SEO helpers
├── backend/             ASP.NET Core 8 minimal API
│   ├── src/Phynexora.Api/
│   │   ├── Endpoints/   Public (enquiries, feedback, chat) + Admin (moderation)
│   │   ├── Data/        IRepository + EF Core (SQL Server) + JSON file store (dev)
│   │   ├── Services/    Turnstile, file storage, email notifier, AI chat assistant
│   │   └── Security/    API-key filters, client IP handling
│   └── database/schema.sql
└── docker-compose.yml   SQL Server + API + website
```

---

## 1. Run locally

**Frontend**

```bash
cd frontend
cp .env.example .env.local      # edit values
npm install
npm run dev                     # http://localhost:3000
```

Without `API_BASE_URL`, forms and the chatbot **mock-succeed in development** (logged in the terminal) so the site can be used immediately. In production they return a clear "temporarily unavailable — use WhatsApp" message instead.

**Backend**

```bash
cd backend/src/Phynexora.Api
dotnet run                      # http://localhost:5080  (Development uses the JSON file store)
```

Then set in `frontend/.env.local`:

```
API_BASE_URL=http://localhost:5080
BACKEND_API_KEY=<same value as backend Security__ClientApiKey>
```

**Everything with Docker:** `docker compose up --build` (SQL Server, API and website).

---

## 2. Configuration

### Contact details (WhatsApp, email, phone…)

All contact details live in **`frontend/src/config/site.ts`**, overridable with environment variables. No component hardcodes them.

| Variable | Current value |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `+94711523123` |
| `NEXT_PUBLIC_WHATSAPP_DISPLAY` | `+94 71 152 3123` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `phynexora@gmail.com` |
| `NEXT_PUBLIC_CONTACT_PHONE` | `+94711523123` |
| `NEXT_PUBLIC_CONTACT_LOCATION` / `NEXT_PUBLIC_WORKING_HOURS` | `Colombo, Sri Lanka` / `24 Hours` |
| `NEXT_PUBLIC_SOCIAL_*` | *(empty — icons shown as "coming soon")* |
| `NEXT_PUBLIC_SITE_URL` | `https://www.phynexora.com` — **set to your real domain** |

### Backend (`appsettings.json` or environment variables, e.g. `Security__AdminApiKey`)

| Setting | Purpose |
|---|---|
| `ConnectionStrings__Default` | SQL Server / Azure SQL connection string |
| `Database__Provider` | `SqlServer` (default) or `File` (JSON store, single instance) |
| `Database__AutoMigrate` | `true` to create the schema on startup (or run `database/schema.sql`) |
| `Security__ClientApiKey` | Shared key the Next.js server sends (`X-Api-Key`) |
| `Security__AdminApiKey` | Admin key (≥ 24 chars). Admin API is disabled when empty |
| `Security__IpHashSalt` | Salt for hashing client IPs (raw IPs are never stored) |
| `Turnstile__SecretKey` | Cloudflare Turnstile secret (pair with `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) |
| `Ai__Provider` / `Ai__ApiKey` / `Ai__Model` | Enable the AI chatbot (`Anthropic`) |
| `Smtp__*`, `Notifications__To` | Email alerts for new enquiries, leads and feedback |
| `Storage__UploadsPath` | Where enquiry attachments are stored (outside the web root) |

**Secrets never go in `NEXT_PUBLIC_*` variables or frontend code.** The browser only talks to Next.js route handlers, which validate input and forward to the API server-side.

---

## 3. Key features & how they work

- **Signature ecosystem visual** — `components/sections/HeroEcosystem.tsx`. Business → Phynexora → ERP/POS/Web/Mobile/AI/Automation/Integrations/Cloud, animated connections, hover/tap/keyboard explanations.
- **Chatbot** — guided flow (`lib/chat/guidedFlow.ts`, a pure state machine) collects name, company, email, WhatsApp, service and description, saves a lead, then hands off to WhatsApp with a pre-filled summary. Set `NEXT_PUBLIC_CHAT_MODE=ai` + backend `Ai__*` to answer free-text questions with AI; it falls back to the guided flow on any error.
- **Floating contact** — desktop: WhatsApp button + contact menu (WhatsApp · Call · Email · Chat). Mobile: sticky bottom bar (WhatsApp · Call · Chat · Get a Quote).
- **Project enquiry form** — client + server validation (shared Zod schema), honeypot, timing trap, optional Turnstile, attachment type/size/signature checks, success and error states.
- **Feedback & testimonials** — submissions are stored as **Pending**. Only feedback approved via the admin API (and with publication consent) appears in the carousel.
- **Analytics** — `lib/analytics.ts` sends events to GA4 and/or Plausible when configured: WhatsApp/phone/email clicks, form submissions, quote requests, chatbot interactions, service page, portfolio and case-study views.
- **SEO** — per-page titles/descriptions/canonicals/Open Graph, generated OG image, `sitemap.xml`, `robots.txt`, Organization, WebSite, Service, FAQPage, Article and BreadcrumbList structured data.
- **Accessibility** — semantic landmarks, skip link, keyboard-operable menus/timeline/accordion/carousel, visible focus states, labelled form fields with error announcements, `prefers-reduced-motion` respected (scroll reveals are CSS scroll-driven animations with no JS).
- **Performance** — every page is statically pre-rendered; no animation libraries; UI mockups are HTML/CSS (no image downloads); scroll reveals cost zero JavaScript.
- **Security** — CSP and security headers, rate limiting (Next.js + API), input sanitisation, API keys compared in constant time, uploads stored with random names outside the web root.

---

## 4. Admin / moderation

Admin endpoints (`X-Admin-Key` header) are documented in `backend/src/Phynexora.Api/Phynexora.Api.http`:

- `GET /api/admin/enquiries`, `PATCH /api/admin/enquiries/{id}`, attachment download
- `GET /api/admin/chat-leads`
- `GET /api/admin/feedback?status=Pending`, `POST …/{id}/approve`, `POST …/{id}/reject`

A full admin UI can be added on top of these endpoints. For a multi-user admin panel, replace the API-key filter with ASP.NET Core Identity or Microsoft Entra ID.

Content (services, portfolio, case studies, FAQ, blog) currently lives in typed files under `frontend/src/content/` and is structured so it can be moved behind the API later without changing components.

---

## 5. Before going live — checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- [ ] Replace **sample** portfolio entries and case studies in `src/content/portfolio.ts` with real projects (set `isSample: false`). Add `results` only when verified and approved by the client.
- [ ] Add social media links when available.
- [ ] Review the three starter blog articles and the Privacy Policy / Terms with your legal adviser.
- [ ] Configure Turnstile, SMTP notifications and analytics.
- [ ] Generate strong values for `BACKEND_API_KEY` / `Security__ClientApiKey`, `Security__AdminApiKey` and `Security__IpHashSalt`.

### Build note

The API builds with EF Core SQL Server by default (`dotnet build`). `dotnet build -p:UseSqlServer=false` compiles without EF Core and uses the JSON file store — handy for demos or CI without database packages.
