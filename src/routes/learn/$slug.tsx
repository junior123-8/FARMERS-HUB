import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { getArticle, relatedArticles } from "@/data/articles";

export const Route = createFileRoute("/learn/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Guide"} · Dairy Farmers Hub` },
      { name: "description", content: loaderData?.summary ?? "" },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  const more = relatedArticles(article.slug);

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Link to="/learn" className="text-sm font-semibold text-forest">
          All guides
        </Link>
        <div className="mt-4">
          <Badge tone="forest">{article.topic}</Badge>
        </div>
        <h1 className="mt-3 font-display text-title font-medium tracking-tight">{article.title}</h1>
        <p className="mt-3 text-lg text-muted">{article.summary}</p>
        <p className="mt-2 text-sm text-subtle">{article.minutes} minute read</p>

        {article.image ? (
          <figure className="mt-8">
            <img
              src={article.image.src}
              alt={article.image.alt}
              className="frame-photo rounded-lg"
            />
            <figcaption className="mt-2 text-sm text-muted">{article.image.caption}</figcaption>
          </figure>
        ) : null}

        <section className="mt-8 rounded-sheet border border-line bg-foam p-6">
          <h2 className="font-display text-xl font-medium tracking-tight">In short</h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5">
            {article.takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-col gap-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-medium tracking-tight">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-ink">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 flex flex-col gap-2 border-l border-line pl-4">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-sheet bg-forest p-6 text-paper">
          <h2 className="font-display text-xl font-medium tracking-tight">Do this week</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {article.thisWeek.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <p className="mt-8 text-sm text-muted">
          This is a field guide, not a prescription. If a cow is down, fevered, or not eating, call a veterinarian or your ward livestock officer. Do not copy a dose from a neighbour’s packet.
        </p>

        <aside className="mt-12 border-t border-line pt-8">
          <h2 className="font-display text-xl font-medium">Read next</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {more.map((item) => (
              <li key={item.slug}>
                <Link
                  to="/learn/$slug"
                  params={{ slug: item.slug }}
                  className="block rounded-lg border border-line p-4 transition-colors duration-150 ease-smooth hover:bg-card"
                >
                  <p className="text-sm font-semibold text-forest">{item.topic}</p>
                  <p className="mt-1 font-display text-lg text-ink">{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </article>
    </SiteShell>
  );
}
