export function ksh(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "−" : "";
  return `${sign}KSh ${Math.abs(rounded).toLocaleString("en-KE")}`;
}

export function litres(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded.toLocaleString("en-KE", { maximumFractionDigits: 1 })} L`;
}
