/* Live client sites.
 *
 * Every URL here was opened and photographed before it was added, and each entry
 * uses the site's own custom domain where one resolves and its Vercel URL where
 * one does not. Three rules govern what goes in:
 *
 *   1. `built` describes THE WORK, not the client's industry. "Food import and
 *      distribution" tells a visitor what the client sells; "product catalogue
 *      with call, WhatsApp and enquiry actions" tells them what we made. Only
 *      features visible on the page may be listed — nothing inferred, nothing
 *      taken on trust from the client.
 *   2. No outcome, metric or result claim appears here, because none are
 *      verified. Case studies with numbers belong in content/work/*.mdx, behind
 *      the draft flag, once a client has approved them.
 *   3. Dead links are worse than a short portfolio. A status code is not enough
 *      either: henj-uae.com returns 200 and serves a placeholder, which is only
 *      visible in a screenshot. Re-photograph before trusting an entry again.
 */

export type PortfolioItem = {
  name: string
  url: string
  /** What we built, in features a visitor can see on the page */
  built: string
  /** Omitted where the site itself does not state one. Never inferred from a TLD. */
  location?: string
  /** Matches a service slug, so the list can be grouped or filtered later */
  capability: 'websites' | 'custom-software' | 'ai-automation'
  /** Screenshot in public/work, captured at 1440x900 and served at 800x500 */
  image: string
}

export const portfolio: PortfolioItem[] = [
  {
    name: 'JNK Nutrition',
    url: 'https://jnknutrition.com',
    built: 'Bilingual supplement store with brand pages, blog and app sign-up',
    location: 'Dubai',
    capability: 'websites',
    image: '/work/jnk-nutrition.jpg',
  },
  {
    name: 'Core Champs',
    url: 'https://corechamps.us',
    built: 'Authentication tool where buyers verify a code printed on the pack',
    capability: 'custom-software',
    image: '/work/core-champs.jpg',
  },
  {
    name: 'Avion Realty',
    // The apex avionrealty.ae does not resolve; only the www host does.
    url: 'https://www.avionrealty.ae',
    built: 'Property portal with search by type, bedrooms, price and currency',
    location: 'Dubai',
    capability: 'websites',
    image: '/work/avion-realty.jpg',
  },
  {
    name: 'Shobkichu',
    url: 'https://www.shobkichu.com.bd',
    built: 'Bengali marketplace with category browsing, deals and cash on delivery',
    location: 'Bangladesh',
    capability: 'websites',
    image: '/work/shobkichu.jpg',
  },
  {
    name: 'Glow & Lean',
    url: 'https://www.glownlean.com',
    built: 'Cosmetics store with category browsing, timed deals and a journal',
    location: 'Bangladesh',
    capability: 'websites',
    image: '/work/glow-n-lean.jpg',
  },
  {
    name: 'Scoops Monster',
    url: 'https://scoopsmonster.com',
    built: 'Supplement brand site with a shop and pack verification',
    location: 'United States',
    capability: 'websites',
    image: '/work/scoops-monster.jpg',
  },
  {
    name: 'HENJ Trading',
    // henj-uae.com resolves but serves a "something is happening" holding page;
    // the finished site is on the Vercel URL. The live site's own canonical
    // still points at that holding page, which is worth fixing on their side.
    url: 'https://henj.vercel.app',
    built: 'Product catalogue with call, WhatsApp and enquiry actions',
    location: 'Dubai',
    capability: 'websites',
    image: '/work/henj.jpg',
  },
  {
    name: 'Distinct Solutions',
    url: 'https://www.distinct-solutions.ae',
    built: 'Maintenance and fit-out site with quote requests and WhatsApp contact',
    location: 'Dubai',
    capability: 'websites',
    image: '/work/distinct.jpg',
  },
  {
    name: 'Eva Design Furniture',
    url: 'https://www.evafurniture.ae',
    built: 'Atelier site with collections, journal and consultation booking',
    location: 'Dubai',
    capability: 'websites',
    image: '/work/eva-furniture.jpg',
  },
  {
    name: 'One Ton Pickup',
    url: 'https://www.onetonpickup.com',
    built: 'Rental site with vehicle specs, coverage areas, FAQ and one-tap calling',
    location: 'Dubai',
    capability: 'websites',
    image: '/work/one-ton-pickup.jpg',
  },
  {
    name: 'Digital Point Real Estate',
    url: 'https://digitalpointrealty-eight.vercel.app',
    built: 'Property site covering leasing, management and sales enquiries',
    location: 'Abu Dhabi',
    capability: 'websites',
    image: '/work/digital-point.jpg',
  },
  {
    name: 'Ravenala Beach Bungalows',
    url: 'https://ravenala-tau.vercel.app',
    built: 'Resort site with rooms, amenities, gallery and booking',
    location: 'Moalboal, Cebu',
    capability: 'websites',
    image: '/work/ravenala.jpg',
  },
]
