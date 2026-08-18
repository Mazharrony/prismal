export const site = {
  name: 'Prismal',
  domain: 'https://prismal.ae',
  tagline: 'We build the software Dubai companies run on.',
  // TODO(prismal): confirm legal entity name, trade licence no. and registered address.
  legalName: 'Prismal',
  city: 'Dubai',
  country: 'AE',
  email: 'hello@prismal.ae', // TODO(prismal): confirm contact destination
} as const

export const nav = [
  { href: '/services/ship', label: 'Ship it' },
  { href: '/services/automate', label: 'Run it without you' },
  { href: '/services/decide', label: 'Make it decide' },
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
