/* The three service lines, framed outcome-first.
 *
 * "AI, Software, Automation" are categories, not reasons to buy. Each entry leads
 * with what the client gets; the capability is the mechanism underneath.
 *
 * Ordered as a maturity ladder — build it, run it without you, make it decide.
 * That ladder is the scroll journey, the customer journey, and the upsell path.
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
  /** What the engagement involves */
  includes: { step: string; detail: string }[]
  /** TODO(prismal): real ranges required before launch */
  timeline: string
  priceFrom: string
}

export const services: Service[] = [
  {
    slug: 'ship',
    title: 'Ship it',
    capability: 'Software',
    promise: 'From an idea to a product your customers can actually use.',
    forWhom: [
      'Founders with a validated idea and no engineering team',
      'Companies whose internal tool has outgrown spreadsheets',
      'Teams who need a second product built while the first keeps running',
    ],
    includes: [
      { step: 'Scope', detail: 'We agree what the first version does — and what it deliberately does not.' },
      { step: 'Architecture', detail: 'Choices you can live with for three years, not three months.' },
      { step: 'Build', detail: 'Working software in front of you every week, not at the end.' },
      { step: 'Launch', detail: 'Deployed, monitored, and handed over with the keys.' },
    ],
    timeline: 'TODO(prismal): typical delivery window',
    priceFrom: 'TODO(prismal): starting engagement size',
  },
  {
    slug: 'automate',
    title: 'Run it without you',
    capability: 'Automation',
    promise: 'The manual work disappears. The process keeps running.',
    forWhom: [
      'Ops teams re-keying the same data between systems',
      'Businesses where one person is the bottleneck for a daily task',
      'Companies whose tools do not talk to each other',
    ],
    includes: [
      { step: 'Map', detail: 'We follow the work as it actually happens, not as the SOP describes it.' },
      { step: 'Connect', detail: 'Your existing systems, integrated — no rip and replace.' },
      { step: 'Automate', detail: 'The repetitive path runs itself; the exceptions come to a human.' },
      { step: 'Verify', detail: 'You see what ran, what did not, and why.' },
    ],
    timeline: 'TODO(prismal): typical delivery window',
    priceFrom: 'TODO(prismal): starting engagement size',
  },
  {
    slug: 'decide',
    title: 'Make it decide',
    capability: 'AI',
    promise: 'Systems that judge, not just execute.',
    forWhom: [
      'Teams whose rules have too many exceptions to hard-code',
      'Businesses sitting on documents, tickets, or messages nobody reads',
      'Companies who tried a chatbot and got something they could not trust',
    ],
    includes: [
      { step: 'Frame', detail: 'We define the decision, and what a wrong answer costs.' },
      { step: 'Evaluate', detail: 'Measured against your real data before anything ships.' },
      { step: 'Integrate', detail: 'It lives inside the workflow people already use.' },
      { step: 'Guard', detail: 'Limits, fallbacks, and a human path when confidence drops.' },
    ],
    timeline: 'TODO(prismal): typical delivery window',
    priceFrom: 'TODO(prismal): starting engagement size',
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
