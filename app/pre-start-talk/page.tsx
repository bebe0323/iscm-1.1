
import { Suspense } from "react";
import { getPendingPreStartTalks } from "../actions/preStartTalk"
import { Skeleton } from "@/components/ui/skeleton";
import PreStartList from "@/components/PreStart/preStartList";

export default async function Page() {
  const pendingPreStartTalks = await getPendingPreStartTalks();
  if (!pendingPreStartTalks.success) {
    return (
      <div>error</div>
    )
  }
  return (
    <div>
      <Suspense fallback={<Skeleton />}>
        <PreStartList preStartTalks={pendingPreStartTalks.data!} />
      </Suspense>
    </div>
  )
}
