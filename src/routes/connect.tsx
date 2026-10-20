import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buyers, joinSteps, opportunities } from "@/data/cooperatives";

export const Route = createFileRoute("/connect")({
  component: ConnectPage,
  head: () => ({
    meta: [
      { title: "Co-operatives and buyers · Dairy Farmers Hub" },
      {
        name: "description",
        content:
          "A plain guide to Kenyan dairy co-operatives and processors, and what to ask before you deliver milk.",
      },
    ],
  }),
});

function ConnectPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-sm font-semibold text-forest">Connect</p>
        <h1 className="mt-2 max-w-3xl font-display text-title font-medium tracking-tight">
          Co-operatives, processors, and the questions that matter
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Names farmers already meet on the collection route. This is a map, not a phone book — pay rates and test rules change, and a number copied from an old poster can send you to the wrong office. Confirm them at the centre you can actually reach.
        </p>

        <ul className="mt-10 flex flex-col gap-4">
          {buyers.map((buyer) => (
            <li key={buyer.name} className="rounded-sheet border border-line bg-card p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={buyer.kind === "Co-operative" ? "forest" : "neutral"}>{buyer.kind}</Badge>
                <span className="text-sm text-muted">{buyer.where}</span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-medium tracking-tight">{buyer.name}</h2>
              <p className="mt-2 max-w-3xl text-muted">{buyer.summary}</p>
            </li>
          ))}
        </ul>

        <section className="mt-14">
          <h2 className="font-display text-title font-medium tracking-tight">Before you commit a can</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {joinSteps.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-line p-5">
                <p className="font-display text-lg text-forest tabular-nums">0{index + 1}</p>
                <h3 className="mt-2 font-display text-xl font-medium tracking-tight">{step.title}</h3>
                <p className="mt-2 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-title font-medium tracking-tight">Where else to look</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Not adverts. These are the doors that usually open for a small herd, if you arrive with a specific question.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {opportunities.map((item) => (
              <li key={item.title} className="rounded-sheet bg-foam p-6">
                <h3 className="font-display text-xl font-medium tracking-tight">{item.title}</h3>
                <p className="mt-2 text-ink">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 flex flex-col gap-4 rounded-sheet border border-line p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight">Price the milk before you switch buyers</h2>
            <p className="mt-2 max-w-xl text-muted">
              A higher posted price can lose to transport and rejections. Run both prices through the calculator with the same costs.
            </p>
          </div>
          <Button asChild>
            <Link to="/calculator">Open the calculator</Link>
          </Button>
        </section>
      </div>
    </SiteShell>
  );
}
