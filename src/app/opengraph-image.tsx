import { HERO, SITE } from "@/content/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = SITE.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** The site-wide share image: the hero, as a card. Sub-pages add their own alongside their route. */
export default function Image() {
  return renderOg({ eyebrow: HERO.eyebrow, title: HERO.headline.join(" ") });
}
