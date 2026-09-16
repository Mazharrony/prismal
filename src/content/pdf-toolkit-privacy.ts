/**
 * The PDF Toolkit privacy policy, word for word as published.
 *
 * Legal copy lives in its own file rather than in `site.ts`: it is supplied
 * by the app owner, it is not marketing voice, and it must be edited as a
 * whole. The page at `/pdf-toolkit/privacy` renders nothing that is not here.
 *
 * Anything changed here must also move `updated` — the page prints that date
 * and the policy promises it.
 */

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

export const PDF_TOOLKIT_PRIVACY = {
  app: "PDF Toolkit",
  eyebrow: "PDF TOOLKIT · ANDROID",
  title: "Privacy policy",
  updated: "4 September 2026",
  updatedLabel: "Last updated",
  /** Browser tab + search result. */
  metaTitle: "PDF Toolkit privacy policy",
  metaDescription:
    "PDF Toolkit is an offline Android document tool. It collects nothing and is built without the Android INTERNET permission, so it cannot connect to a network at all.",
  backLabel: "← prismal.ae",
  intro:
    "PDF Toolkit is an offline document tool for Android. This policy explains, in plain terms, what the app does and does not do with your information.",
  summary: {
    title: "Short version",
    body: "PDF Toolkit collects nothing, sends nothing, and has no way to. The app is built without the Android INTERNET permission, so it cannot make a network connection of any kind. Your documents are processed on your phone and stay there.",
  },
  sections: [
    {
      title: "What we collect",
      body: [
        "Nothing. There are no accounts, no sign-in, no analytics, no advertising, no crash-reporting service, and no third-party tracking of any kind.",
        "We never see your documents, their contents, their file names, or anything about how you use the app.",
      ],
    },
    {
      title: "What stays on your device",
      body: [
        "The app stores a small amount of data locally, in its own private storage. None of it leaves the device, and none of it is readable by other apps.",
      ],
      table: {
        head: ["Stored", "Why", "How long"],
        rows: [
          [
            "A list of recently opened files (name, size, page count, and a reference to the file)",
            "So the Recent list works",
            "Until you remove the entry, clear the app's data, or uninstall",
          ],
          [
            "Copies of files you are working on, and the results",
            "Needed to do the work",
            "Deleted automatically after 24 hours, and on uninstall",
          ],
          [
            "Your saved signature, if you create one",
            "So you can reuse it",
            "Until you delete it or uninstall",
          ],
        ],
      },
      after: [
        "This data is deliberately excluded from Android's cloud backup and from device-to-device transfer, so it is never copied to Google's servers or to a new phone.",
      ],
    },
    {
      title: "Permissions",
      table: {
        head: ["Permission", "Why"],
        rows: [
          [
            "Notifications",
            "To show progress while a document is being processed. You can decline; the app still works.",
          ],
        ],
      },
      after: [
        "The app does not request access to your camera, photos, storage, contacts, or location. When you open a PDF or pick a photo, Android's own picker hands the app just the item you chose.",
      ],
    },
    {
      title: "Document scanning",
      body: [
        "The \u201cScan to PDF\u201d feature uses Google Play services' on-device document scanner. The camera is operated by Google Play services, not by PDF Toolkit, and the scan is processed on your device; the app only receives the resulting image. Your use of Google Play services is governed by Google's Privacy Policy. If Google Play services is not present on your device, this one feature is unavailable and the rest of the app is unaffected.",
      ],
    },
    {
      title: "Files you save or share",
      body: [
        "When you save a result or send it to another app, that file leaves PDF Toolkit and is then handled by whatever you chose \u2014 your file manager, an email app, a cloud drive, and so on. What happens to it after that is governed by that app's own privacy policy, not this one.",
      ],
    },
    {
      title: "Children",
      body: [
        "The app is a general-purpose utility, is not directed at children, and collects no data from anyone, including children.",
      ],
    },
    {
      title: "Changes",
      body: [
        "If this policy changes, the date at the top will change with it, and the updated policy will be published at the same address.",
      ],
    },
  ] as readonly PolicySection[],
  contact: {
    title: "Contact",
    body: "Questions about this policy:",
    email: "mazharronydxb@gmail.com",
  },
} as const;
