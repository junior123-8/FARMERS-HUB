export const categories = ["Milk", "Livestock", "Feeds", "Equipment"] as const;

export type Category = (typeof categories)[number];

export type Listing = {
  id: string;
  category: Category;
  title: string;
  county: string;
  place: string;
  price: number;
  unit: string;
  seller: string;
  phone: string;
  note: string;
  sample?: boolean;
};

export const counties = [
  "Bomet",
  "Embu",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kirinyaga",
  "Meru",
  "Murang'a",
  "Nakuru",
  "Nandi",
  "Nyandarua",
  "Nyeri",
  "Trans Nzoia",
  "Uasin Gishu",
];

export const sampleListings: Listing[] = [
  {
    id: "sample-milk-githunguri",
    category: "Milk",
    title: "Evening milk, about 40 litres",
    county: "Kiambu",
    place: "Githunguri",
    price: 50,
    unit: "per litre",
    seller: "Example farm",
    phone: "",
    note: "Alcohol-test clean, aluminium cans, ready from 6pm. This notice is an example, not a real seller.",
    sample: true,
  },
  {
    id: "sample-milk-engineer",
    category: "Milk",
    title: "Morning milk, 25 litres",
    county: "Nyandarua",
    place: "Engineer",
    price: 47,
    unit: "per litre",
    seller: "Example farm",
    phone: "",
    note: "Collected at the farm gate before 7am. Example only — confirm any real price at your centre.",
    sample: true,
  },
  {
    id: "sample-heifer-meru",
    category: "Livestock",
    title: "In-calf Ayrshire heifer",
    county: "Meru",
    place: "Timau road",
    price: 95000,
    unit: "per head",
    seller: "Example farm",
    phone: "",
    note: "Served four months ago, papers for the sire code available to view. Example listing.",
    sample: true,
  },
  {
    id: "sample-calf-nakuru",
    category: "Livestock",
    title: "Friesian bull calf, 4 months",
    county: "Nakuru",
    place: "Bahati",
    price: 28000,
    unit: "per head",
    seller: "Example farm",
    phone: "",
    note: "On milk and early napier. Example only, so you can see how a clear animal notice reads.",
    sample: true,
  },
  {
    id: "sample-meal-kiambu",
    category: "Feeds",
    title: "Dairy meal, 70 kg bags",
    county: "Kiambu",
    place: "Limuru",
    price: 3800,
    unit: "per bag",
    seller: "Example store",
    phone: "",
    note: "Pickup only. Ask to see the mill date. Prices move — this figure is an illustration.",
    sample: true,
  },
  {
    id: "sample-napier-muranga",
    category: "Feeds",
    title: "Chopped napier, weekly",
    county: "Murang'a",
    place: "Kangari",
    price: 350,
    unit: "per sack",
    seller: "Example farm",
    phone: "",
    note: "Cut young and chopped the same morning. Example notice for a fodder seller.",
    sample: true,
  },
  {
    id: "sample-cans-eldoret",
    category: "Equipment",
    title: "Aluminium milk cans, 50 litres",
    county: "Uasin Gishu",
    place: "Eldoret",
    price: 4500,
    unit: "each",
    seller: "Example farm",
    phone: "",
    note: "Used, dents only, no sour smell. Example listing — inspect any can yourself.",
    sample: true,
  },
  {
    id: "sample-cutter-nyeri",
    category: "Equipment",
    title: "Diesel chaff cutter, working",
    county: "Nyeri",
    place: "Mukurwe-ini",
    price: 65000,
    unit: "each",
    seller: "Example farm",
    phone: "",
    note: "Seen cutting napier, not a showroom piece. Example price, not an offer.",
    sample: true,
  },
];

const STORAGE_KEY = "dfh-listings-v1";

export function isListing(value: unknown): value is Listing {
  if (!value || typeof value !== "object") return false;
  const row = value as Partial<Listing>;
  return (
    typeof row.id === "string" &&
    typeof row.title === "string" &&
    typeof row.county === "string" &&
    typeof row.category === "string" &&
    categories.includes(row.category as Category) &&
    typeof row.price === "number" &&
    row.sample !== true
  );
}

export function loadMyListings(): Listing[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isListing);
  } catch {
    return [];
  }
}

export function saveMyListings(listings: Listing[]) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(listings.filter((row) => !row.sample)),
    );
  } catch {
    /* keep the notice on screen even if storage is blocked */
  }
}
