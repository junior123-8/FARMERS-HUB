import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/articles";
import { compute, presets } from "@/lib/calculator";
import { ksh, litres } from "@/lib/money";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Dairy Farmers Hub" },
      {
        name: "description",
        content:
          "Feeding, breeding, disease prevention, milk hygiene, and a milk income calculator for Kenyan dairy farmers.",
      },
    ],
  }),
});

const week = [
  "Cut napier before it goes woody, and notice whether the cows finish it.",
  "Write yesterday’s litres for each cow. A drop is often heat or the start of mastitis.",
  "Check the withdrawal date before a treated cow’s milk joins the can.",
  "Put this month’s dairy meal and the price you were paid into the calculator.",
];

function Home() {
  const example = presets[1];
  const result = compute(example.input);

  return (
    <SiteShell>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="text-sm font-semibold text-forest">For farmers who milk every day</p>
            <h1 className="mt-3 font-display text-display font-medium tracking-tight text-ink">
              Dairy Farmers Hub
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Plain-language guides and a milk income calculator for smallholder herds in Kenya — from one cow to a zero-grazing unit you can walk across in a minute.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/calculator">Open the calculator</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/learn">Read the guides</Link>
              </Button>
            </div>
          </div>
          <figure>
            <img
              src="/images/hero-farm.jpg"
              alt="Two Friesian cows eating chopped napier in a timber shed, with aluminium milk cans on the concrete"
              className="frame-hero rounded-lg"
            />
            <figcaption className="mt-3 text-sm text-muted">
              A highland morning: forage in the trough, cans ready for the collection route.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12">
          <div>
            <h2 className="font-display text-title font-medium tracking-tight">This week on the farm</h2>
            <p className="mt-3 text-muted">
              Four jobs that protect litres. None of them need a new breed.
            </p>
          </div>
          <ol className="flex flex-col gap-4">
            {week.map((item, index) => (
              <li key={item} className="flex gap-4 border-b border-line pb-4">
                <span className="font-display text-xl text-forest tabular-nums">0{index + 1}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-title font-medium tracking-tight">Field guides</h2>
              <p className="mt-2 max-w-xl text-muted">
                Written for Kenyan sheds: napier, AI, East Coast fever, the alcohol test, and the milk statement.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link to="/learn">All five guides</Link>
            </Button>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <li key={article.slug}>
                <Link
                  to="/learn/$slug"
                  params={{ slug: article.slug }}
                  className="group flex h-full flex-col rounded-sheet border border-line bg-paper p-6 transition-colors duration-150 ease-smooth hover:bg-foam"
                >
                  <Badge tone="forest">{article.topic}</Badge>
                  <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-ink">
                    {article.title}
                  </h3>
                  <p className="mt-2 flex-1 text-muted">{article.summary}</p>
                  <p className="mt-4 text-sm font-semibold text-ink">{article.minutes} min read</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 rounded-sheet border border-line bg-card p-6 lg:grid-cols-2 lg:p-10">
          <div>
            <p className="text-sm font-semibold text-forest">Milk income calculator</p>
            <h2 className="mt-2 font-display text-title font-medium tracking-tight">
              Price the month before it prices you
            </h2>
            <p className="mt-3 text-muted">
              {example.label}: {example.detail}. After feed, fodder, a milker, the vet, and transport, this is what the preset leaves.
            </p>
            <Button asChild className="mt-6">
              <Link to="/calculator">Use your own figures</Link>
            </Button>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            <Figure label="Litres sold" value={litres(result.litresMonth)} />
            <Figure label="Gross" value={ksh(result.grossMonth)} />
            <Figure label="Cash costs" value={ksh(result.costs)} />
            <Figure label="Left over" value={ksh(result.net)} />
          </dl>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-2">
          <Link
            to="/market"
            className="rounded-sheet border border-line bg-card p-6 transition-colors duration-150 ease-smooth hover:bg-paper-2"
          >
            <h2 className="font-display text-2xl font-medium tracking-tight">Notice board</h2>
            <p className="mt-2 text-muted">
              Sample posts for milk, animals, feed, and equipment — and a place to draft your own on this device.
            </p>
          </Link>
          <Link
            to="/connect"
            className="rounded-sheet border border-line bg-card p-6 transition-colors duration-150 ease-smooth hover:bg-paper-2"
          >
            <h2 className="font-display text-2xl font-medium tracking-tight">Co-operatives and buyers</h2>
            <p className="mt-2 text-muted">
              Who collects milk in the main dairy counties, and the six questions to ask before you commit a can.
            </p>
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-paper p-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 font-display text-2xl tabular-nums text-ink">{value}</dd>
    </div>
  );
}
