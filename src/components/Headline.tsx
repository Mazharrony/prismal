import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Splits text into word spans the reveal CSS can lift one by one. */
export function Words({ text, from = 0 }: { text: string; from?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        // The space must sit between word boxes, not inside one, or the clipped
        // inline-block swallows it as trailing whitespace.
        <span key={i}>
          <span className="w" style={{ "--i": from + i } as CSSProperties}>
            <span>{w}</span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

/** The same rise one glyph at a time, for short figures rather than sentences. */
export function Chars({ text, from = 0 }: { text: string; from?: number }) {
  return (
    <>
      {Array.from(text).map((c, i) =>
        c === " " ? (
          <span key={i}> </span>
        ) : (
          <span key={i} className="w" style={{ "--i": from + i } as CSSProperties}>
            <span>{c}</span>
          </span>
        ),
      )}
    </>
  );
}

/**
 * A display headline whose words rise into view when its `data-rv` ancestor
 * (or itself) enters the viewport. `lines` renders one line per entry; a
 * single string wraps naturally.
 */
export default function Headline({
  as: Tag = "h2",
  lines,
  className,
  children,
}: {
  as?: ElementType;
  lines?: readonly string[];
  className?: string;
  children?: ReactNode;
}) {
  let count = 0;
  return (
    <Tag className={cn("hl", className)} data-rv="words">
      {lines
        ? lines.map((l, i) => {
            const from = count;
            count += l.split(" ").length;
            return (
              <span key={i} className="block">
                <Words text={l} from={from} />
              </span>
            );
          })
        : typeof children === "string"
          ? <Words text={children} />
          : children}
    </Tag>
  );
}
