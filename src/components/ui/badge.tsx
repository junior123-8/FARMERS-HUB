import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "forest";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 font-sans text-xs font-semibold",
        tone === "forest" ? "bg-foam text-forest" : "bg-paper-2 text-muted",
      )}
    >
      {children}
    </span>
  );
}
