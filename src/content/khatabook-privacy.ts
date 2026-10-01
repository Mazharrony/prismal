/**
 * The Khatabook (খাতাবুক) privacy policy, as published at `/khatabook/privacy`.
 *
 * Legal copy lives in its own file rather than in `site.ts`: it is the app
 * owner's, it is not marketing voice, and it must be edited as a whole. Every
 * claim here was checked against the app's source (amar-hisab, package
 * com.khatabookbd.app): three permissions, no network code (a release gate
 * fails the build otherwise), Android Auto Backup on for the database and
 * settings but not the PIN. Like the app's own copy, it never says "nothing
 * ever leaves your device": Android's backup can carry the data to Google
 * Drive. If the app gains a network, an account or an SDK, this policy must
 * change before that build ships.
 *
 * Anything changed here must also move `updated` — the page prints that date
 * and the policy promises it.
 */

import type { PolicySection } from "./policy";

export const KHATABOOK_PRIVACY = {
  app: "Khatabook",
  eyebrow: "KHATABOOK · খাতাবুক · ANDROID",
  title: "Privacy policy",
  updated: "1 October 2026",
  updatedLabel: "Last updated",
  /** Browser tab + search result. */
  metaTitle: "Khatabook privacy policy",
  metaDescription:
    "Khatabook (খাতাবুক) is an offline money book for Android. No internet permission, no account, no ads, no analytics: your records are kept on your phone.",
  backLabel: "← prismal.ae",
  intro:
    "Khatabook (খাতাবুক) is an Android app for everyday money: expenses, income, দেনা-পাওনা, a daily cash book, budgets and money tools. This policy explains, in plain terms, what the app does and does not do with your information.",
  summary: {
    title: "Short version",
    body: "No internet permission, no account, no ads, no analytics. The app is built without the Android INTERNET permission, so it cannot send your records anywhere. We never receive any of your data. Your records are kept on your phone, and they leave it only in the ways you choose, described below.",
  },
  sections: [
    {
      title: "What we collect",
      body: [
        "Nothing. There are no accounts, no sign-in, no analytics, no advertising, no crash-reporting service, and no third-party tracking of any kind. The app contains no code that can connect to the internet.",
        "We never see your entries, your balances, the people in your দেনা-পাওনা, or anything about how you use the app.",
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
            "Your records: entries, amounts, notes, wallets, categories and budgets",
            "This is the money book itself",
            "Until you delete them, clear the app's data, or uninstall",
          ],
          [
            "People you add to দেনা-পাওনা: a name, and optionally a phone number, a note and a due date",
            "To track who owes whom, and to address a reminder when you send one",
            "Until you delete them, clear the app's data, or uninstall",
          ],
          [
            "Settings: language, currency, reminder time and similar choices",
            "So the app remembers your choices",
            "Until you clear the app's data or uninstall",
          ],
          [
            "App lock: a one-way hash of your PIN, never the PIN itself, and the lock's attempt counter",
            "So the app lock works",
            "Until you turn the lock off, clear the app's data, or uninstall",
          ],
        ],
      },
    },
    {
      title: "Android backup",
      body: [
        "If Android's backup is turned on for your phone, Android may copy your records and settings to your Google account's backup, so they come back when you restore or move to a new phone. On Android 9 and later this backup is end-to-end encrypted with your phone's screen lock. It is made and stored by Android under your Google account and its settings, not by Khatabook; we have no access to it. You can turn it off in your phone's settings.",
        "Your app lock PIN is deliberately excluded from this backup and from phone-to-phone transfer. It stays on the phone where you set it.",
      ],
    },
    {
      title: "Backups, exports and messages you send",
      body: [
        "Your data leaves the app only when you make it:",
        "Backup file and CSV export: when you back up or export, Android's file picker lets you choose where the file goes. The backup file is not encrypted, so keep it somewhere you trust. When you restore, the app reads only the file you pick.",
        "Reminders and sharing: when you send a দেনা-পাওনা reminder or share something, the app hands the text (and the person's phone number, if you saved one) to the app you choose, such as WhatsApp, your SMS app or the phone dialer. You review and send it from there yourself; the app never sends or calls anything on its own.",
        "Once a file or message is in another app or service, what happens to it is governed by that app's own privacy policy, not this one.",
      ],
    },
    {
      title: "Other people's details",
      body: [
        "If you add someone to দেনা-পাওনা, their name and any phone number you enter are stored only on your phone, as part of your own records. We never receive them. Please add only details you have a reason to keep.",
      ],
    },
    {
      title: "Permissions",
      table: {
        head: ["Permission", "Why"],
        rows: [
          [
            "Notifications",
            "Asked for only when you turn a reminder on, to show that reminder. You can decline; the rest of the app still works.",
          ],
          [
            "Run at startup",
            "Puts your reminders back after the phone restarts. Never shown as a prompt, and only active once you set a reminder.",
          ],
          [
            "Biometric",
            "Lets the app lock use your phone's own fingerprint or face unlock. The app never sees your fingerprint or face; Android only tells it whether unlocking succeeded.",
          ],
        ],
      },
      after: [
        "The app does not request access to the internet, your contacts, camera, photos, files, SMS, calls or location.",
      ],
    },
    {
      title: "App lock",
      body: [
        "The app lock is a privacy screen that stops someone who picks up your phone from opening the app. It is not encryption of your records.",
      ],
    },
    {
      title: "Children",
      body: [
        "The app is a personal finance tool, is not directed at children, and collects no data from anyone, including children.",
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
