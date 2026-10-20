import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { articles, topics, type Topic } from "@/data/articles";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn/")({
  component: LearnIndex,
  head: () => ({
    meta: [
      { title: "Field guides · Dairy Farmers Hub" },
      {
        name: "description",
        content:
          "Guides on feeding, breeding, disease prevention, milk hygiene, and farm management for Kenyan dairy farmers.",
      },
    ],
  }),
});

function LearnIndex() {
  const [topic, setTopic] = useState<Topic | "All">("All");
  const visible = useMemo(
    () => (topic === "All" ? articles : articles.filter((article) => article.topic === topic)),
    [topic],
  );

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-sm font-semibold text-forest">Learn</p>
        <h1 className="mt-2 max-w-2xl font-display text-title font-medium tracking-tight">
          Field guides for the shed, not the seminar
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Five short reads. Each one ends with something you can do before the next milking, and a reminder that drugs and doses belong to a vet who has seen the cow.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Topics">
          <TopicButton current={topic} value="All" onSelect={setTopic} />
          {topics.map((item) => (
            <TopicButton key={item} current={topic} value={item} onSelect={setTopic} />
          ))}
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {visible.map((article) => (
            <li key={article.slug}>
              <Link
                to="/learn/$slug"
                params={{ slug: article.slug }}
                className="flex h-full flex-col overflow-hidden rounded-sheet border border-line bg-card transition-colors duration-150 ease-smooth hover:bg-paper"
              >
                {article.image ? (
                  <img src={article.image.src} alt={article.image.alt} className="frame-photo" />
                ) : (
                  <div className="border-b border-line bg-foam px-6 py-8">
                    <p className="font-display text-2xl text-forest">Look every milking.</p>
                    <p className="mt-2 max-w-sm text-muted">
                      Mastitis, ticks, and withdrawal dates — prevention you can keep without a poster.
                    </p>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <Badge tone="forest">{article.topic}</Badge>
                  <h2 className="mt-3 font-display text-2xl font-medium tracking-tight">{article.title}</h2>
                  <p className="mt-2 flex-1 text-muted">{article.summary}</p>
                  <p className="mt-4 text-sm font-semibold">{article.minutes} min read</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}

function TopicButton({
  current,
  value,
  onSelect,
}: {
  current: Topic | "All";
  value: Topic | "All";
  onSelect: (value: Topic | "All") => void;
}) {
  const selected = current === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={() => onSelect(value)}
      className={cn(
        "min-h-11 rounded-sm border px-4 text-sm font-semibold transition-colors duration-150 ease-smooth",
        selected ? "border-forest bg-forest text-paper" : "border-line bg-card text-ink hover:bg-paper-2",
      )}
    >
      {value}
    </button>
  );
}
