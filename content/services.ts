/* The three service lines, framed outcome-first.
 *
 * "Websites, custom software, AI operations" are categories, not reasons to buy.
 * Each entry leads with what the client gets; the capability is the mechanism
 * underneath.
 *
 * Ordered by how much of the business the work touches — the page your customers
 * land on, the system your team works in, then the daily operation itself. That
 * order is the scroll journey, the customer journey, and the upsell path.
 *
 * The third line is built per client, not licensed. A CRM is the usual shape it
 * takes, but nothing here is a product with seats and tiers — if the copy ever
 * starts reading that way, it has drifted.
 */

export type Service = {
  slug: string
  /** Chapter title — the outcome, in the client's words */
  title: string
  /** The capability that delivers it */
  capability: string
  /** One line, stated as a result */
  promise: string
  /** Who this is actually for — helps SME buyers self-qualify fast */
  forWhom: string[]
  /** The concrete things that get built — named, so nobody has to infer them */
  deliverables: string[]
  /** What the engagement involves */
  includes: { step: string; detail: string }[]
}

export const services: Service[] = [
  {
    slug: 'websites',
    title: 'Websites and web apps',
    capability: 'Websites',
    promise: 'You own the site, and anyone on your team can change the words on it. It loads in about a second on a phone.',
    forWhom: [
      'Marketing teams who email an agency and wait three days to change one price',
      'Companies paying for ads that send people to a page taking eight seconds to open on a phone',
      'Clinics, shops and offices whose customers need to book a slot or pay a deposit on the site',
    ],
    deliverables: [
      'E-commerce',
      'Booking and payments',
      'Landing pages',
      'Customer logins',
      'A CMS your team can edit',
    ],
    includes: [
      { step: 'Pages', detail: 'We list every page, what it\'s for, and what a visitor should be able to do on it before any design starts.' },
      { step: 'Build', detail: 'Next.js and React. The pages render on the server, so Google gets the same HTML a visitor gets.' },
      { step: 'Speed', detail: 'We test on a mid-range Android over 4G, not a laptop on fibre.' },
      { step: 'Handover', detail: 'On launch day the domain, the code and the CMS logins move into your accounts. If you hire a different developer next year, there\'s nothing you\'d have to ask us for.' },
    ],
  },
  {
    slug: 'custom-software',
    title: 'Software made to order',
    capability: 'Custom software',
    promise: 'Software written for one company. It has to fit how your team already works, including the parts of the job that are awkward.',
    forWhom: [
      'Companies that renew a licence every January for a tool doing about half the job, then do the other half in Excel',
      'Businesses whose real process lives in a spreadsheet because no product matches it',
      'Founders sitting on half-finished code from a developer who stopped replying',
    ],
    deliverables: [
      'Dashboards',
      'Client portals',
      'Internal tools',
      'Mobile apps',
      'Integrations between systems you already run',
    ],
    includes: [
      { step: 'Scope', detail: 'We write down what version one does and what\'s waiting until later, and we both sign that off before anyone writes code.' },
      { step: 'Records', detail: 'We build around the records you already keep and the way you already file them. If you do something odd for one client every March, that goes in too.' },
      { step: 'Weekly builds', detail: 'You get something you can click through every week. Most of what we get wrong turns up in those sessions.' },
      { step: 'Ownership', detail: 'The code sits in your GitHub account from the first commit.' },
    ],
  },
  {
    slug: 'ai-automation',
    title: 'AI that runs the admin',
    capability: 'AI operations',
    promise: 'Quotes go out and invoices get chased without anyone sitting there doing it. It usually ends up as a CRM, built for your business alone.',
    forWhom: [
      'Sales teams whose leads are spread across WhatsApp, a shared inbox and someone\'s phone',
      'Businesses where the first two hours of the day go on writing quotes and chasing invoices that were due in June',
      'Companies who tried a chatbot once and wouldn\'t let it near a customer again',
    ],
    deliverables: [
      'CRM',
      'Lead capture and routing',
      'Automated quoting',
      'Invoice chasing',
      'Document processing',
      'Support triage',
    ],
    includes: [
      { step: 'A week of watching', detail: 'We sit with your team for a week and watch how the work actually gets done. Most of what we build comes out of that week.' },
      { step: 'What gets built', detail: 'A lead comes in, it goes to the right person, the quote goes out the same day, and the follow-up happens on day three whether anyone remembers or not. Usually that\'s a CRM with the invoice chasing wired into it.' },
      { step: 'Limits', detail: 'You set the limits it works inside. When it isn\'t sure, it stops and hands the job to a person.' },
      { step: 'Testing', detail: 'Before it goes live we run it against last year\'s enquiries and compare what it says to what your team said at the time.' },
    ],
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
