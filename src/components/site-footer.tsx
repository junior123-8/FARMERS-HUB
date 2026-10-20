import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2">
        <div>
          <p className="font-display text-xl text-ink">Dairy Farmers Hub</p>
          <p className="mt-2 max-w-md text-base text-muted">
            Practical notes for smallholder dairy farmers in Kenya: feeding, breeding, herd health, milk hygiene, and a calculator for the month’s shillings.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <Link to="/learn" className="min-h-11 text-base text-ink">
            Field guides
          </Link>
          <Link to="/calculator" className="min-h-11 text-base text-ink">
            Milk income calculator
          </Link>
          <Link to="/market" className="min-h-11 text-base text-ink">
            Notice board
          </Link>
          <Link to="/connect" className="min-h-11 text-base text-ink">
            Co-operatives and buyers
          </Link>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-muted">
          Guides are a starting point, not a veterinary prescription. Doses and diagnoses belong to a vet or livestock officer who has seen the animal. Prices on the notice board that are marked as examples are not offers.
        </p>
      </div>
    </footer>
  );
}
