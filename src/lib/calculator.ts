export type CalcInput = {
  cows: number;
  litresPerCow: number;
  price: number;
  days: number;
  feed: number;
  fodder: number;
  labour: number;
  vet: number;
  transport: number;
  lossPercent: number;
};

export type CalcResult = {
  litresDay: number;
  litresSoldDay: number;
  litresMonth: number;
  grossDay: number;
  grossMonth: number;
  costs: number;
  net: number;
  netPerCow: number;
  netPerLitre: number;
  breakEven: number;
  priceDropHit: number;
};

export type Preset = {
  id: string;
  label: string;
  detail: string;
  input: CalcInput;
};

export const presets: Preset[] = [
  {
    id: "starter",
    label: "One cow, starting out",
    detail: "1 cow · 8 litres · KSh 50",
    input: {
      cows: 1,
      litresPerCow: 8,
      price: 50,
      days: 30,
      feed: 4200,
      fodder: 1000,
      labour: 0,
      vet: 600,
      transport: 400,
      lossPercent: 2,
    },
  },
  {
    id: "small",
    label: "Small zero-grazing",
    detail: "4 cows · 10 litres · KSh 50",
    input: {
      cows: 4,
      litresPerCow: 10,
      price: 50,
      days: 30,
      feed: 18000,
      fodder: 5000,
      labour: 6000,
      vet: 2500,
      transport: 2000,
      lossPercent: 3,
    },
  },
  {
    id: "eight",
    label: "Eight-cow herd",
    detail: "8 cows · 12 litres · KSh 52",
    input: {
      cows: 8,
      litresPerCow: 12,
      price: 52,
      days: 30,
      feed: 42000,
      fodder: 8000,
      labour: 12000,
      vet: 4000,
      transport: 3500,
      lossPercent: 3,
    },
  },
];

export const defaultInput: CalcInput = presets[0].input;

const STORAGE_KEY = "dfh-calculator-v1";

export function clampInput(input: CalcInput): CalcInput {
  const num = (value: number) => (Number.isFinite(value) ? value : 0);
  return {
    cows: Math.max(0, num(input.cows)),
    litresPerCow: Math.max(0, num(input.litresPerCow)),
    price: Math.max(0, num(input.price)),
    days: Math.min(31, Math.max(1, num(input.days) || 1)),
    feed: Math.max(0, num(input.feed)),
    fodder: Math.max(0, num(input.fodder)),
    labour: Math.max(0, num(input.labour)),
    vet: Math.max(0, num(input.vet)),
    transport: Math.max(0, num(input.transport)),
    lossPercent: Math.min(100, Math.max(0, num(input.lossPercent))),
  };
}

export function compute(raw: CalcInput): CalcResult {
  const input = clampInput(raw);
  const keep = 1 - input.lossPercent / 100;
  const litresDay = input.cows * input.litresPerCow;
  const litresSoldDay = litresDay * keep;
  const litresMonth = litresSoldDay * input.days;
  const grossDay = litresSoldDay * input.price;
  const grossMonth = litresMonth * input.price;
  const costs =
    input.feed + input.fodder + input.labour + input.vet + input.transport;
  const net = grossMonth - costs;
  return {
    litresDay,
    litresSoldDay,
    litresMonth,
    grossDay,
    grossMonth,
    costs,
    net,
    netPerCow: input.cows > 0 ? net / input.cows : 0,
    netPerLitre: litresMonth > 0 ? net / litresMonth : 0,
    breakEven: litresMonth > 0 ? costs / litresMonth : 0,
    priceDropHit: litresMonth * 5,
  };
}

export function loadInput(): CalcInput | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CalcInput>;
    if (typeof parsed.cows !== "number") return null;
    return clampInput({ ...defaultInput, ...parsed });
  } catch {
    return null;
  }
}

export function saveInput(input: CalcInput) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clampInput(input)));
  } catch {
    /* private mode or a full disk — the page still calculates */
  }
}
