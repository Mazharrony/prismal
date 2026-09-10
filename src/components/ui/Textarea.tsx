import * as React from "react";
import { cn } from "@/lib/utils";

/** Textarea on the paper form card, with the Input's focus ring. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-28 w-full min-w-0 resize-y rounded-xl border border-ink/15 bg-white px-3.5 py-3 font-sans text-sm font-normal tracking-normal text-ink transition-colors outline-none",
        "placeholder:text-muted-2/70 focus-visible:border-ink focus-visible:ring-3 focus-visible:ring-accent/50",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
