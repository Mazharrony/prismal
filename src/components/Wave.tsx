import { cn } from "@/lib/utils";

/** Curved seam between two bands; coloured via `currentColor`. */
export default function Wave({
  flip,
  className,
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={cn("wave", flip && "wave--flip", className)}
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
    >
      <path
        d="M0 62C220 100 460 4 720 44S1180 96 1440 30V91H0Z"
        fill="currentColor"
      />
    </svg>
  );
}
