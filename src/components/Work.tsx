import StackCard from "@/components/StackCard";
import WorkStrip from "@/components/WorkStrip";
import { WORK_HEAD } from "@/content/site";

/** Selected work: the twelve live builds listed in content/site.ts. */
export default function Work() {
  return (
    <StackCard id="work" top={106} z={4} note={WORK_HEAD.note}>
      <WorkStrip />
    </StackCard>
  );
}
