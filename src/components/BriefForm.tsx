"use client";

import { useActionState, useId, useRef, useState } from "react";
import { sendBrief } from "@/app/actions/send-brief";
import { Field, TextField } from "@/components/ui/Field";
import { CONTACT, SITE, type Channel } from "@/content/site";
import { initialBriefState, type BriefField } from "@/lib/brief";
import { focus } from "@/lib/styles";
import { cn } from "@/lib/utils";

const chip =
  "cursor-pointer rounded-full border px-4 py-2 font-brand text-[14px] font-semibold transition-colors duration-150";
const chipOff = "border-white/20 bg-transparent text-paper/85 hover:border-paper";
const chipOn = "border-accent bg-accent text-ink";
const groupLabel = "mb-3 block font-mono text-[11px] uppercase tracking-[.2em] text-muted";

/**
 * The brief, as a letter: underline fields, service chips, a reply-channel
 * toggle that asks for a number only when it needs one, and one send button.
 * `key` remounts a fresh form for "Send another".
 */
export default function BriefForm() {
  const [round, setRound] = useState(0);
  return <Form key={round} onReset={() => setRound((r) => r + 1)} />;
}

function Form({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState(sendBrief, initialBriefState);
  const [pick, setPick] = useState(state.values?.service ?? "");
  const [channel, setChannel] = useState<Channel>(
    (state.values?.channel as Channel) || "email",
  );
  const brief = useRef<HTMLTextAreaElement>(null);
  const uid = useId();
  const id = (f: BriefField) => `${uid}-${f}`;
  const err = (f: BriefField) => state.fieldErrors?.[f]?.[0];
  const value = (f: BriefField) => state.values?.[f] ?? "";

  if (state.status === "sent") {
    return (
      <div className="grid gap-5" role="status" aria-live="polite">
        <p className="display m-0 text-[clamp(64px,8vw,120px)] text-accent">{CONTACT.form.sentTitle}</p>
        <p className="m-0 max-w-[46ch] text-[17px] leading-[1.6] text-paper/85">{CONTACT.form.sent}</p>
        <button
          type="button"
          onClick={onReset}
          className={cn("w-fit cursor-pointer border-0 bg-transparent p-0 text-[14px] font-semibold text-muted underline-offset-4 hover:text-paper hover:underline", focus)}
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

  return (
    <form action={action} noValidate className="grid gap-9">
      <fieldset className="m-0 border-0 p-0">
        <legend className={groupLabel}>{CONTACT.form.pickLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT.form.picks.map((c) => (
            <button
              key={c.label}
              type="button"
              aria-pressed={pick === c.label}
              onClick={() => choose(c)}
              className={cn(chip, pick === c.label ? chipOn : chipOff, focus)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="service" value={pick} />
      </fieldset>

      <div className="grid gap-7">
        <div className="grid grid-cols-2 gap-x-8 gap-y-7 max-[520px]:grid-cols-1">
          <Field id={id("name")} name="name" label={CONTACT.form.name} autoComplete="name" defaultValue={value("name")} error={err("name")} />
          <Field id={id("company")} name="company" label={CONTACT.form.company} autoComplete="organization" defaultValue={value("company")} error={err("company")} />
        </div>
        <Field id={id("email")} name="email" type="email" inputMode="email" label={CONTACT.form.email} autoComplete="email" defaultValue={value("email")} error={err("email")} />
        <TextField id={id("brief")} name="brief" ref={brief} label={CONTACT.form.brief} defaultValue={value("brief")} error={err("brief")} />
      </div>

      <fieldset className="m-0 border-0 p-0">
        <legend className={groupLabel}>{CONTACT.form.channelLabel}</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={CONTACT.form.channelLabel}>
          {CONTACT.form.channels.map((c) => (
            <button
              key={c.value}
              type="button"
              role="radio"
              aria-checked={channel === c.value}
              onClick={() => setChannel(c.value)}
              className={cn(chip, channel === c.value ? chipOn : chipOff, focus)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="channel" value={channel} />
        <div className={cn("grid transition-[grid-template-rows] duration-300", channel === "email" ? "grid-rows-[0fr]" : "grid-rows-[1fr]")}>
          <div className="min-h-0 overflow-hidden">
            <Field
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              label={CONTACT.form.phone}
              autoComplete="tel"
              defaultValue={value("phone")}
              error={err("phone")}
              className="mt-6"
              tabIndex={channel === "email" ? -1 : 0}
            />
          </div>
        </div>
      </fieldset>

      {/* Honeypot: hidden from people, filled by bots. */}
      <label className="sr-only" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>

      {state.status === "error" && state.message && (
        <p className="m-0 text-[14px] leading-[1.5] text-coral" role="alert">
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
        data-magnetic=""
        data-cursor="Send"
        className={cn(
          "group flex cursor-pointer items-center justify-between rounded-full border-0 py-5 pl-7 pr-3 font-brand text-[18px] font-semibold transition-colors",
          pending ? "bg-muted-2 text-paper" : "bg-accent text-ink hover:bg-paper",
          focus,
        )}
      >
        {pending ? CONTACT.form.sending : CONTACT.form.submit}
        <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-ink text-accent transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}
