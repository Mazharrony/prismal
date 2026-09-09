import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The Storefront design system's Input, with its tokens mapped onto this
 * site's palette and without the base-ui dependency (a plain <input> renders
 * identically for a text field).
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-line bg-surface px-3 py-1 font-sans text-base font-normal tracking-normal text-ink transition-colors outline-none md:text-sm",
        "placeholder:text-muted focus-visible:border-[#F9D20F] focus-visible:ring-3 focus-visible:ring-[#F9D20F]/30",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
