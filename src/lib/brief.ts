/** Shared shape of the Brief form's action state (client and server). */

export type BriefField = "name" | "company" | "email" | "brief";

export type BriefState = {
  status: "idle" | "sent" | "error";
  /** Shown above the button on a send failure; the mailto fallback follows it. */
  message?: string;
  fieldErrors?: Partial<Record<BriefField, string[]>>;
  /** Echoed back so a failed submit keeps what was typed. */
  values?: Partial<Record<BriefField, string>>;
};

export const initialBriefState: BriefState = { status: "idle" };
