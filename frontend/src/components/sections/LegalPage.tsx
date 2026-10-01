import { PageHero } from "./PageHero";

export type LegalSection = { heading: string; body: (string | string[])[] };

export function LegalPage({ title, description, path, updated, sections }: { title: string; description: string; path: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero title={title} description={description} crumbs={[{ name: title, path }]}>
        <p className="text-sm text-subtle">Last updated: {updated}</p>
      </PageHero>
      <div className="container-x grid gap-12 pb-24 lg:grid-cols-[240px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-28 space-y-2 border-l border-line pl-4 text-sm">
            {sections.map((s, i) => (
              <li key={s.heading}><a href={`#s${i + 1}`} className="text-muted transition-colors hover:text-fg">{s.heading}</a></li>
            ))}
          </ol>
        </nav>
        <div className="prose-px max-w-3xl">
          {sections.map((s, i) => (
            <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-28">
              <h2>{i + 1}. {s.heading}</h2>
              {s.body.map((b, j) => (Array.isArray(b) ? <ul key={j}>{b.map((li) => <li key={li}>{li}</li>)}</ul> : <p key={j}>{b}</p>))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
