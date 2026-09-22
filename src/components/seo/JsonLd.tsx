import type { Thing } from "schema-dts";

/**
 * Structured data as a plain `<script>`: JSON-LD is data, not code, so
 * `next/script` is the wrong tool (Next's own guide says so). The nodes go out
 * as one `@graph`, which lets them point at each other by `@id`. "<" is
 * escaped so no string in the payload can close the tag early.
 */
export default function JsonLd({ data }: { data: readonly Thing[] }) {
  const payload = { "@context": "https://schema.org", "@graph": data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }}
    />
  );
}
