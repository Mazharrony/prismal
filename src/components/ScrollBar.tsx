/** Hairline scroll progress along the very top; driven by Interactions. */
export default function ScrollBar() {
  return (
    <div
      id="scroll-progress"
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-accent"
    />
  );
}
