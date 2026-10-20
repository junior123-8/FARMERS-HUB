import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm font-semibold text-forest">Missing page</p>
        <h1 className="mt-3 font-display text-title font-medium tracking-tight">
          That page is not on the hub.
        </h1>
        <p className="mt-4 text-lg text-muted">
          The guide may have moved. Start from the field notes or the milk calculator.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/learn">Browse guides</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
