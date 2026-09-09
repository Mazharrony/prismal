"use client";

import { useActionState, useId, useState } from "react";
import { sendBrief } from "@/app/actions/send-brief";
import { initialBriefState, type BriefField } from "@/lib/brief";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CONTACT, SITE } from "@/content/site";
import { cn } from "@/lib/utils";

const labelClass =
  "grid gap-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-muted";
const errorClass = "text-[12px] font-medium normal-case tracking-normal text-destructive";

/**
 * The Brief tab. Posts to the `sendBrief` server action; the pill shows
 * pending / error states and the whole form swaps for a confirmation once the
 * email is away. `key` on the wrapper remounts a fresh form for "Send another".
 */
export default function BriefForm() {
  const [round, setRound] = useState(0);
  return <Form key={round} onReset={() => setRound((r) => r + 1)} />;
}

function Form({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState(sendBrief, initialBriefState);
  const uid = useId();
  const id = (f: BriefField) => `${uid}-${f}`;
  const err = (f: BriefField) => state.fieldErrors?.[f]?.[0];

  if (state.status === "sent") {
    return (
      <div className="grid gap-3" role="status" aria-live="polite">
        <p className="m-0 flex items-center justify-center rounded-full bg-accent p-3.5 text-center text-[15px] font-bold text-ink">
          {CONTACT.form.sent}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="cursor-pointer border-0 bg-transparent text-[13px] font-semibold text-muted underline-offset-4 hover:underline"
        >
          {CONTACT.form.again}
        </button>
      </div>
    );
  }

  const error = (f: BriefField) =>
    err(f) && (
      <span id={`${id(f)}-error`} className={errorClass} role="alert">
        {err(f)}
      </span>
    );
  const a11y = (f: BriefField) => ({
    id: id(f),
    name: f,
    "aria-invalid": err(f) ? true : undefined,
    "aria-describedby": err(f) ? `${id(f)}-error` : undefined,
    defaultValue: state.values?.[f] ?? "",
  });

  return (
    <form action={action} noValidate className="grid gap-3">
      <div className="grid grid-cols-2 gap-3 max-[420px]:grid-cols-1">
        <label htmlFor={id("name")} className={labelClass}>
          <span>{CONTACT.form.name.label}</span>
          <Input
            {...a11y("name")}
            placeholder={CONTACT.form.name.placeholder}
            autoComplete="name"
          />
          {error("name")}
        </label>
        <label htmlFor={id("company")} className={labelClass}>
          <span>{CONTACT.form.company.label}</span>
          <Input
            {...a11y("company")}
            placeholder={CONTACT.form.company.placeholder}
            autoComplete="organization"
          />
          {error("company")}
        </label>
      </div>
      <label htmlFor={id("email")} className={labelClass}>
        <span>{CONTACT.form.email.label}</span>
        <Input
          {...a11y("email")}
          type="email"
          inputMode="email"
          placeholder={CONTACT.form.email.placeholder}
          autoComplete="email"
        />
        {error("email")}
      </label>
      <label htmlFor={id("brief")} className={labelClass}>
        <span>{CONTACT.form.brief.label}</span>
        <Textarea
          {...a11y("brief")}
          placeholder={CONTACT.form.brief.placeholder}
        />
        {error("brief")}
      </label>

      {/* Honeypot: hidden from people, filled by bots. */}
      <label className="sr-only" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>

      {state.status === "error" && state.message && (
        <p className="m-0 text-[13px] leading-[1.5] text-destructive" role="alert">
          {state.message}{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className={cn(
          "flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 p-3.5 text-[15px] font-bold text-accent transition-colors",
          pending ? "bg-muted" : "bg-ink hover:bg-muted",
        )}
      >
        {pending ? CONTACT.form.sending : CONTACT.form.submit}
      </button>
    </form>
  );
}
