import { useEffect, useMemo, useState, type InputHTMLAttributes } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  categories,
  counties,
  loadMyListings,
  sampleListings,
  saveMyListings,
  type Category,
  type Listing,
} from "@/data/market";
import { ksh } from "@/lib/money";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/market")({
  component: MarketPage,
  head: () => ({
    meta: [
      { title: "Notice board · Dairy Farmers Hub" },
      {
        name: "description",
        content:
          "Example notices for milk, livestock, feeds, and equipment, plus a draft board saved on your device.",
      },
    ],
  }),
});

const blank = {
  category: "Milk" as Category,
  title: "",
  county: "Kiambu",
  place: "",
  price: "",
  unit: "per litre",
  seller: "",
  phone: "",
  note: "",
};

function MarketPage() {
  const [mine, setMine] = useState<Listing[]>([]);
  const [ready, setReady] = useState(false);
  const [category, setCategory] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");

  useEffect(() => {
    setMine(loadMyListings());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveMyListings(mine);
  }, [mine, ready]);

  const listings = useMemo(() => {
    const all = [...mine, ...sampleListings];
    const q = query.trim().toLowerCase();
    return all.filter((row) => {
      if (category !== "All" && row.category !== category) return false;
      if (!q) return true;
      return [row.title, row.county, row.place, row.category, row.note, row.seller]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [mine, category, query]);

  function publish() {
    const title = form.title.trim();
    const seller = form.seller.trim();
    const price = Number(form.price);
    if (title.length < 3) {
      setError("Give the notice a clear title — what is for sale, and roughly how much.");
      return;
    }
    if (!seller) {
      setError("Add the name buyers should ask for.");
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      setError("Enter a price in shillings. Use 0 only if you truly mean ‘on enquiry’.");
      return;
    }
    const listing: Listing = {
      id: crypto.randomUUID(),
      category: form.category,
      title,
      county: form.county,
      place: form.place.trim(),
      price,
      unit: form.unit.trim() || "each",
      seller,
      phone: form.phone.trim(),
      note: form.note.trim(),
    };
    setMine((current) => [listing, ...current]);
    setForm(blank);
    setError("");
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-sm font-semibold text-forest">Market</p>
        <h1 className="mt-2 font-display text-title font-medium tracking-tight">
          A notice board for the milk shed
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Example notices show how to describe milk, stock, feed, and tools without wasting a buyer’s journey. Notices you add stay on this phone or computer. They are not sent to other farmers yet.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="market-search">
            Search notices
          </label>
          <Input
            id="market-search"
            value={query}
            placeholder="Search county, feed, cans…"
            onChange={(event) => setQuery(event.target.value)}
            className="sm:max-w-sm"
          />
          <div className="flex flex-wrap gap-2">
            <FilterChip current={category} value="All" onSelect={setCategory} />
            {categories.map((item) => (
              <FilterChip key={item} current={category} value={item} onSelect={setCategory} />
            ))}
          </div>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
          <ul className="order-2 flex flex-col gap-3 lg:order-1">
            {listings.length === 0 ? (
              <li className="rounded-sheet border border-line bg-card p-6 text-muted">
                Nothing matches. Clear the search, or draft a notice on this device.
              </li>
            ) : (
              listings.map((listing) => (
                <li key={listing.id} className="rounded-sheet border border-line bg-card p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="forest">{listing.category}</Badge>
                    {listing.sample ? <Badge>Example</Badge> : <Badge>On this device</Badge>}
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-medium tracking-tight">{listing.title}</h2>
                  <p className="mt-1 text-muted">
                    {listing.place ? `${listing.place}, ` : ""}
                    {listing.county}
                  </p>
                  <p className="mt-3 font-display text-xl tabular-nums">
                    {ksh(listing.price)} <span className="font-sans text-base text-muted">{listing.unit}</span>
                  </p>
                  <p className="mt-3">{listing.note}</p>
                  <p className="mt-3 text-sm text-muted">
                    {listing.seller}
                    {listing.phone ? ` · ${listing.phone}` : listing.sample ? " · no real contact" : ""}
                  </p>
                  {!listing.sample ? (
                    <Button
                      type="button"
                      variant="ghost"
                      className="mt-3 px-0"
                      onClick={() => setMine((current) => current.filter((row) => row.id !== listing.id))}
                    >
                      Remove this notice
                    </Button>
                  ) : null}
                </li>
              ))
            )}
          </ul>

          <form
            className="order-1 flex flex-col gap-4 rounded-sheet border border-line bg-paper-2 p-6 lg:order-2 lg:sticky lg:top-24"
            onSubmit={(event) => {
              event.preventDefault();
              publish();
            }}
          >
            <h2 className="font-display text-xl">Draft a notice</h2>
            <p className="text-sm text-muted">Saved here only. Do not put a number you would not say at the collection centre.</p>

            <div className="flex flex-col gap-2">
              <Label htmlFor="category">What is it</Label>
              <select
                id="category"
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value as Category })}
                className="h-11 rounded-sm border border-line bg-card px-3"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <Field label="Title" id="title" value={form.title} onChange={(title) => setForm({ ...form, title })} placeholder="Morning milk, 30 litres" />
            <div className="flex flex-col gap-2">
              <Label htmlFor="county">County</Label>
              <select
                id="county"
                value={form.county}
                onChange={(event) => setForm({ ...form, county: event.target.value })}
                className="h-11 rounded-sm border border-line bg-card px-3"
              >
                {counties.map((county) => (
                  <option key={county}>{county}</option>
                ))}
              </select>
            </div>
            <Field label="Town or ward" id="place" value={form.place} onChange={(place) => setForm({ ...form, place })} placeholder="Githunguri" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Price (KSh)" id="price" value={form.price} onChange={(price) => setForm({ ...form, price })} inputMode="decimal" placeholder="50" />
              <Field label="Unit" id="unit" value={form.unit} onChange={(unit) => setForm({ ...form, unit })} placeholder="per litre" />
            </div>
            <Field label="Name" id="seller" value={form.seller} onChange={(seller) => setForm({ ...form, seller })} placeholder="Your name" />
            <Field label="Phone (optional)" id="phone" value={form.phone} onChange={(phone) => setForm({ ...form, phone })} placeholder="07…" inputMode="tel" />
            <div className="flex flex-col gap-2">
              <Label htmlFor="note">Note</Label>
              <textarea
                id="note"
                value={form.note}
                onChange={(event) => setForm({ ...form, note: event.target.value })}
                rows={4}
                className="rounded-sm border border-line bg-card px-3 py-2 text-base text-ink placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                placeholder="When it is ready, how it was tested, what a buyer should bring."
              />
            </div>
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <Button type="submit">Save on this device</Button>
          </form>
        </div>
      </div>
    </SiteShell>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function FilterChip({
  current,
  value,
  onSelect,
}: {
  current: Category | "All";
  value: Category | "All";
  onSelect: (value: Category | "All") => void;
}) {
  const selected = current === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "min-h-11 rounded-sm border px-3 text-sm font-semibold transition-colors duration-150 ease-smooth",
        selected ? "border-forest bg-forest text-paper" : "border-line bg-card text-ink",
      )}
    >
      {value}
    </button>
  );
}
