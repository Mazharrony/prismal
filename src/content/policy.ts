/** Shapes shared by the app privacy policies hosted on the site. */

export type PolicyTable = {
  /** Column headings, in order. */
  head: readonly string[];
  /** Rows, each as many cells as there are headings. */
  rows: readonly (readonly string[])[];
};

export type PolicySection = {
  /** Section heading. */
  title: string;
  /** Paragraphs under it. */
  body?: readonly string[];
  table?: PolicyTable;
  /** Trailing paragraphs, printed after the table. */
  after?: readonly string[];
};

export type Policy = {
  eyebrow: string;
  title: string;
  updated: string;
  updatedLabel: string;
  backLabel: string;
  intro: string;
  summary: { title: string; body: string };
  sections: readonly PolicySection[];
  contact: { title: string; body: string; email: string };
};
