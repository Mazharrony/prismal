/**
 * The Fuel Log privacy policy, as published at `/fuel-log/privacy`.
 *
 * Legal copy lives in its own file rather than in `site.ts`: it is the app
 * owner's, it is not marketing voice, and it must be edited as a whole. Every
 * claim here was checked against the app's source (Fuel Log, package
 * com.fuelexpenselog.app 1.0.0): two permissions, no network code (a release
 * gate fails the build otherwise), Android Auto Backup on for the database
 * and settings, no sharing or location code. It agrees with the app's own
 * "What this app collects" screen and, like it, never says "nothing ever
 * leaves your device": Android's backup can carry the data to Google Drive.
 * If the app gains a network, an account or an SDK, this policy must change
 * before that build ships.
 *
 * Anything changed here must also move `updated` — the page prints that date
 * and the policy promises it.
 */

import type { PolicySection } from "./policy";

export const FUEL_LOG_PRIVACY = {
  app: "Fuel Log",
  eyebrow: "FUEL LOG · ANDROID",
  title: "Privacy policy",
  updated: "1 October 2026",
  updatedLabel: "Last updated",
  /** Browser tab + search result. */
  metaTitle: "Fuel Log privacy policy",
  metaDescription:
    "Fuel Log is an offline Android app for fuel fill-ups and car expenses. No internet permission, no account, no ads, no analytics: your records are kept on your phone.",
  backLabel: "← prismal.ae",
  intro:
    "Fuel Log is an Android app for logging fuel fill-ups, charging, vehicle expenses and service reminders. This policy explains, in plain terms, what the app does and does not do with your information.",
  summary: {
    title: "Short version",
    body: "No internet permission, no account, no ads, no analytics. The app is built without the Android INTERNET permission, so it cannot send your records anywhere. We never receive any of your data. Your records are kept on your phone, and they leave it only in the ways you choose, described below.",
  },
  sections: [
    {
      title: "What we collect",
      body: [
        "Nothing. There are no accounts, no sign-in, no analytics, no advertising, no crash-reporting service, and no third-party tracking of any kind. The app contains no code that can connect to the internet.",
        "We never see your vehicles, your fill-ups, your spending, or anything about how you use the app. The app does not use your location, contacts or camera.",
      ],
    },
    {
      title: "What stays on your device",
      body: [
        "Everything you enter is stored in the app's own private storage on your phone, where other apps cannot read it.",
      ],
      table: {
        head: ["Stored", "Why", "How long"],
        rows: [
          [
            "Vehicles: a name and type, and optionally make, model, year, licence plate and notes",
            "To keep each vehicle's records apart",
            "Until you delete the vehicle, clear the app's data, or uninstall",
          ],
          [
            "Fill-ups and expenses: date, odometer, amount, price, and optionally a station or vendor name, payment method and notes, all as you type them",
            "This is the log itself, and what the figures are worked out from",
            "Until you delete them, clear the app's data, or uninstall",
          ],
          [
            "Reminders: what is due, and when or at what mileage",
            "So service, insurance and similar reminders work",
            "Until you delete them, clear the app's data, or uninstall",
          ],
          [
            "Settings: units, currency and similar choices",
            "So the app remembers your choices",
            "Until you clear the app's data or uninstall",
          ],
        ],
      },
      after: [
        "Deleting a vehicle removes it and all of its entries. Uninstalling the app removes everything it stores.",
      ],
    },
    {
      title: "Android backup",
      body: [
        "If Android's backup is turned on for your phone, Android may copy the app's data to your Google account's backup, as it does for other apps, so it comes back when you restore or move to a new phone. On Android 9 and later this backup is end-to-end encrypted with your phone's screen lock, so Google cannot read it. It is made and stored by Android under your Google account and its settings, not by Fuel Log; we have no access to it. You can turn it off in your phone's settings.",
      ],
    },
    {
      title: "Backups, exports and imports",
      body: [
        "Your data leaves the app only when you make it. When you save a backup or export a CSV file, Android's file picker lets you choose where the file goes. The backup file is not encrypted, so keep it somewhere you trust. Once saved, these are files you control, and whatever app or service holds them is governed by its own privacy policy, not this one.",
        "When you restore a backup or import a CSV file (from aCar, Drivvo, Fuelio or a spreadsheet), the app reads only the file you pick.",
      ],
    },
    {
      title: "Permissions",
      table: {
        head: ["Permission", "Why"],
        rows: [
          [
            "Notifications",
            "Asked for only when you turn reminders on, to show them. You can decline; the rest of the app still works.",
          ],
          [
            "Run at startup",
            "Used only to set your reminders again after the phone restarts. Never shown as a prompt.",
          ],
        ],
      },
      after: [
        "The app does not request access to the internet, your location, contacts, camera, photos or files. When you import or restore, Android's own picker hands the app just the file you chose.",
      ],
    },
    {
      title: "Children",
      body: [
        "The app is a vehicle log, is not directed at children, and collects no data from anyone, including children.",
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
