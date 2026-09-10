import * as React from "react";
import { cn } from "@/lib/utils";

/** Text input on the paper form card. */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border border-ink/15 bg-white px-3.5 py-1 font-sans text-base font-normal tracking-normal text-ink transition-colors outline-none md:text-sm",
        "placeholder:text-muted-2/70 focus-visible:border-ink focus-visible:ring-3 focus-visible:ring-accent/50",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
