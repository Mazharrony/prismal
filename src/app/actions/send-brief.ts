"use server";

import { Resend } from "resend";
import { z } from "zod";
import { SITE } from "@/content/site";
import type { BriefField, BriefState } from "@/lib/brief";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tell us your name.")
    .max(80, "Keep it under 80 characters."),
  company: z.string().trim().max(120, "Keep it under 120 characters.").default(""),
  email: z.email("Enter an email we can reply to."),
  brief: z
    .string()
    .trim()
    .min(10, "A sentence or two is enough — what needs building?")
    .max(2000, "Keep it under 2000 characters."),
  /** Quick-pick chip, if one was chosen. */
  service: z.string().trim().max(40).default(""),
  // Honeypot: a hidden field a person never sees. Anything in it is a bot.
  website: z.string().default(""),
});

const FIELDS: readonly BriefField[] = ["name", "company", "email", "brief", "service"];
const SEND_FAILED = "Couldn't send just now — email us directly at";

export async function sendBrief(
  _prev: BriefState,
  formData: FormData,
): Promise<BriefState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const values: BriefState["values"] = Object.fromEntries(
    FIELDS.map((f) => [f, raw[f] ?? ""]),
  );

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const all = z.flattenError(parsed.error).fieldErrors;
    const fieldErrors: BriefState["fieldErrors"] = {};
    for (const f of FIELDS) if (all[f]?.length) fieldErrors[f] = all[f];
    return { status: "error", fieldErrors, values };
  }
  if (parsed.data.website !== "") {
    // Quietly accept so the bot learns nothing.
    return { status: "sent" };
  }

  const { name, company, email, brief, service } = parsed.data;
  const to = process.env.BRIEF_TO_EMAIL ?? SITE.email;
  const from = process.env.BRIEF_FROM_EMAIL ?? `${SITE.name} <${SITE.email}>`;
  const key = process.env.RESEND_API_KEY;

  const subject = `New brief — ${name}${company ? ` · ${company}` : ""}${service ? ` · ${service}` : ""}`;
  const text = [
    `Name: ${name}`,
    `Company: ${company || "—"}`,
    `Email: ${email}`,
    `Needs: ${service || "—"}`,
    "",
    brief,
  ].join("\n");

  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[send-brief] RESEND_API_KEY missing — brief not sent:\n" + text);
      return { status: "sent" };
    }
    console.error("[send-brief] RESEND_API_KEY missing in production");
    return { status: "error", message: SEND_FAILED, values };
  }

  try {
    // Instantiated per call so `next build` never needs the key.
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html: text
        .split("\n")
        .map((line) => escapeHtml(line) || "<br>")
        .join("<br>"),
    });
    if (error) throw new Error(error.message);
    return { status: "sent" };
  } catch (e) {
    console.error("[send-brief] Resend failed:", e);
    return { status: "error", message: SEND_FAILED, values };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
