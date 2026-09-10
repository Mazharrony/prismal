"use client";

import { useActionState, useId, useRef, useState } from "react";
import { sendBrief } from "@/app/actions/send-brief";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CONTACT, SITE } from "@/content/site";
import { initialBriefState, type BriefField } from "@/lib/brief";
import { focus } from "@/lib/styles";
import { cn } from "@/lib/utils";

const labelClass = "grid gap-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-muted-2";
const errorClass = "text-[12px] font-medium normal-case tracking-normal text-destructive";

/**
 * The Brief tab. The quick-pick chips prefill the textarea and travel with the
 * email as `service`; the pill shows pending / error states and the form swaps
 * for a confirmation once the email is away. `key` remounts a fresh form for
 * "Send another".
 */
export default function BriefForm() {
  const [round, setRound] = useState(0);
  return <Form key={round} onReset={() => setRound((r) => r + 1)} />;
}

function Form({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState(sendBrief, initialBriefState);
  const [pick, setPick] = useState<string>(state.values?.service ?? "");
  const brief = useRef<HTMLTextAreaElement>(null);
  const uid = useId();
  const id = (f: BriefField) => `${uid}-${f}`;
  const err = (f: BriefField) => state.fieldErrors?.[f]?.[0];

  if (state.status === "sent") {
    return (
      <div className="grid gap-3" role="status" aria-live="polite">
        <p className="m-0 flex items-center justify-center rounded-full bg-accent p-4 text-center font-brand text-[16px] font-semibold text-ink">
          {CONTACT.form.sent}
        </p>
        <button
          type="button"
          onClick={onReset}
          className={cn("cursor-pointer border-0 bg-transparent text-[13px] font-semibold text-muted-2 underline-offset-4 hover:underline", focus)}
        >
          {CONTACT.form.again}
        </button>
      </div>
    );
  }

  const choose = (c: (typeof CONTACT.form.picks)[number]) => {
    setPick(c.label);
    const t = brief.current;
    // Only overwrite an empty textarea or an untouched prefill from another chip.
    if (t && (!t.value.trim() || CONTACT.form.picks.some((p) => t.value.trim() === p.prefill.trim()))) {
      t.value = c.prefill;
      t.focus();
      t.setSelectionRange(t.value.length, t.value.length);
    }
  };

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
    <form action={action} noValidate className="grid gap-4">
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-2 text-[11px] font-bold uppercase tracking-[.14em] text-muted-2">
          {CONTACT.form.pickLabel}
        </legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT.form.picks.map((c) => {
            const on = pick === c.label;
            return (
              <button
                key={c.label}
                type="button"
                aria-pressed={on}
                onClick={() => choose(c)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 font-brand text-[14px] font-semibold transition-colors",
                  on ? "border-ink bg-ink text-accent" : "border-ink/20 bg-transparent text-ink hover:border-ink",
                  focus,
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="service" value={pick} />
      </fieldset>

      <div className="grid grid-cols-2 gap-3 max-[420px]:grid-cols-1">
        <label htmlFor={id("name")} className={labelClass}>
          <span>{CONTACT.form.name.label}</span>
          <Input {...a11y("name")} placeholder={CONTACT.form.name.placeholder} autoComplete="name" />
          {error("name")}
        </label>
        <label htmlFor={id("company")} className={labelClass}>
          <span>{CONTACT.form.company.label}</span>
          <Input {...a11y("company")} placeholder={CONTACT.form.company.placeholder} autoComplete="organization" />
          {error("company")}
        </label>
      </div>
      <label htmlFor={id("email")} className={labelClass}>
        <span>{CONTACT.form.email.label}</span>
        <Input {...a11y("email")} type="email" inputMode="email" placeholder={CONTACT.form.email.placeholder} autoComplete="email" />
        {error("email")}
      </label>
      <label htmlFor={id("brief")} className={labelClass}>
        <span>{CONTACT.form.brief.label}</span>
        <Textarea {...a11y("brief")} ref={brief} placeholder={CONTACT.form.brief.placeholder} />
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
          "flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 p-4 font-brand text-[16px] font-semibold transition-colors",
          pending ? "bg-muted-2 text-paper" : "bg-ink text-accent hover:bg-ink-3",
          focus,
        )}
      >
        {pending ? CONTACT.form.sending : CONTACT.form.submit}
      </button>
    </form>
  );
}
