import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-sm border border-line bg-card px-3 font-sans text-base text-ink placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest",
        className,
      )}
      {...props}
    />
  );
}
