/**
 * Copy for the pages that are not the one-pager. Same rules as `site.ts`:
 * the prism metaphor only in a display headline, plain language elsewhere.
 */

export const NOT_FOUND = {
  metaTitle: "Page not found",
  eyebrow: "404",
  title: "This ray went nowhere.",
  intro:
    "The page you asked for isn't here. It may have moved when the site was rebuilt, or the address has a typo in it.",
  links: [
    { label: "Start at the top", href: "/" },
    { label: "What we do", href: "/#services" },
    { label: "Selected work", href: "/#work" },
    { label: "Say hello", href: "/#contact" },
  ],
} as const;
