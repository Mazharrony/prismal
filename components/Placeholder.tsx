import styles from './placeholder.module.css'

/* Content Prismal has not supplied yet renders as a visible, unmissable marker
 * rather than an invented number. Authors clear it by replacing the string —
 * the marker styling disappears on its own once the TODO prefix is gone. */

const TODO = 'TODO(prismal):'

export function Placeholder({ note }: { note: string }) {
  return (
    <span className={styles.mark} role="note" data-unfilled="true">
      <span className={styles.tag}>needs content</span>
      {note}
    </span>
  )
}

/** Renders a value, or a loud placeholder if it is still a TODO. */
export function Field({ value }: { value: string }) {
  if (value.startsWith(TODO)) {
    return <Placeholder note={value.slice(TODO.length).trim()} />
  }
  return <>{value}</>
}

export const isUnfilled = (value: string) => value.startsWith(TODO)
