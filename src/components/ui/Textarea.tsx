import * as React from "react";
import { cn } from "@/lib/utils";

/** The design's textarea (96px min, vertical resize) with the Input's focus ring. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-24 w-full min-w-0 resize-y rounded-lg border border-line bg-surface px-3 py-2.5 font-sans text-sm font-normal tracking-normal text-ink transition-colors outline-none",
        "placeholder:text-muted focus-visible:border-[#F9D20F] focus-visible:ring-3 focus-visible:ring-[#F9D20F]/30",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
