/**
 * The Pour Party privacy policy, as published at `/pour-party/privacy`.
 *
 * Legal copy lives in its own file rather than in `site.ts`: it is the app
 * owner's, it is not marketing voice, and it must be edited as a whole. Every
 * claim here was checked against the app's release build (package
 * com.pourparty.game, version 1.1.0): no Android permissions, no network
 * code, no ads, analytics or payment SDKs. If the app gains any of those,
 * this policy must change before that build ships.
 *
 * Anything changed here must also move `updated` — the page prints that date
 * and the policy promises it.
 */

import type { PolicySection } from "./policy";

export const POUR_PARTY_PRIVACY = {
  app: "Pour Party",
  eyebrow: "POUR PARTY · ANDROID",
  title: "Privacy policy",
  updated: "30 September 2026",
  updatedLabel: "Last updated",
  /** Browser tab + search result. */
  metaTitle: "Pour Party privacy policy",
  metaDescription:
    "Pour Party is an offline colour water-sort puzzle for Android. It collects nothing, shows no ads, sells nothing, and is built without the Android INTERNET permission.",
  backLabel: "← prismal.ae",
  intro:
    "Pour Party is a colour water-sort puzzle game for Android. This policy explains, in plain terms, what the game does and does not do with your information.",
  summary: {
    title: "Short version",
    body: "Pour Party collects nothing, sends nothing, and has no way to. The game is built without the Android INTERNET permission, so it cannot make a network connection of any kind. There are no ads, no accounts and no in-app purchases. Your progress is saved on your phone and stays there.",
  },
  sections: [
    {
      title: "What we collect",
      body: [
        "Nothing. There are no accounts, no sign-in, no analytics, no advertising, no crash-reporting service, and no third-party tracking of any kind.",
        "We never learn who you are, which device you use, or how you play. We cannot identify you and have no data about you to share, sell or lose.",
      ],
    },
    {
      title: "What stays on your device",
      body: [
        "The game keeps one save file in its own private storage. It is not readable by other apps and is never sent anywhere by the game.",
      ],
      table: {
        head: ["Stored", "Why", "How long"],
        rows: [
          [
            "Game progress: levels completed, stars, coins, boosters, unlocked cosmetics, Candy Lab progress, daily gift and Lucky Spin dates",
            "So you can pick up where you left off",
            "Until you clear the app's data or uninstall",
          ],
          [
            "Settings: sound, music, vibration, colour symbols, pour speed and motion preferences",
            "So the game remembers your choices",
            "Until you clear the app's data or uninstall",
          ],
        ],
      },
      after: [
        "If you have turned on Android's own backup for your device, Android may include this save file in your device backup, so your progress can come back when you restore or move to a new phone. That backup is made and stored by Android under your Google account and its settings, not by Pour Party; we have no access to it. You can turn backup off in your device settings.",
      ],
    },
    {
      title: "Permissions",
      body: [
        "Pour Party requests no Android permissions. It does not access your camera, microphone, photos, files, contacts, location or the internet. Vibration feedback uses Android's standard haptics, which needs no permission.",
      ],
    },
    {
      title: "Ads and purchases",
      body: [
        "There are no advertisements and no in-app purchases. Coins, chests, boosters and cosmetics are earned by playing; they cannot be bought with real money and have no value outside the game.",
      ],
    },
    {
      title: "Children",
      body: [
        "Pour Party is suitable for players of all ages. Because the game collects no personal information from anyone, it collects none from children. It contains no ads, no chat, no links out of the game and no way to contact other players.",
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
