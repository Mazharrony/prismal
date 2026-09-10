import * as React from "react";
import { cn } from "@/lib/utils";

type Common = {
  id: string;
  label: string;
  error?: string;
  className?: string;
};

/**
 * Underline field with a floating label: the label sits on the baseline as
 * the prompt and lifts into a small yellow caption on focus or once there is
 * a value. Styles live in globals.css under "Letter form". The `placeholder`
 * must stay a single space — the float is driven by `:placeholder-shown`.
 */
export function Field({
  id,
  label,
  error,
  className,
  ...props
}: Common & Omit<React.ComponentProps<"input">, "id" | "placeholder">) {
  return (
    <div className={cn("field", className)} data-invalid={error ? "" : undefined}>
      <input
        id={id}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
      {error && (
        <span id={`${id}-error`} className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export function TextField({
  id,
  label,
  error,
  className,
  ...props
}: Common & Omit<React.ComponentProps<"textarea">, "id" | "placeholder">) {
  return (
    <div className={cn("field", className)} data-invalid={error ? "" : undefined}>
      <textarea
        id={id}
        placeholder=" "
        rows={2}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
      {error && (
        <span id={`${id}-error`} className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
