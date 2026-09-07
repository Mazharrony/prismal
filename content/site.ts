export const site = {
  name: 'Prismal',
  domain: 'https://prismal.ae',
  tagline: 'We build websites, custom software and CRM systems for companies in Dubai.',
  // TODO(prismal): confirm legal entity name, trade licence no. and registered address.
  legalName: 'Prismal',
  city: 'Dubai',
  country: 'AE',
  /* WhatsApp is the only contact channel on the site. Held twice on purpose:
   * the display form is what a person reads, and wa.me only accepts digits, so
   * deriving one from the other at each call site invites a broken link. */
  whatsapp: '+971 50 721 7156',
  whatsappUrl: 'https://wa.me/971507217156',
} as const

export const nav = [
  { href: '/services/websites', label: 'Websites' },
  { href: '/services/custom-software', label: 'Custom software' },
  { href: '/services/ai-automation', label: 'AI operations' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
] as const

export const footerNav = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
  { href: '/legal', label: 'Legal' },
] as const
