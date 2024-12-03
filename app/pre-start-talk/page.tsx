
import { getPendingPreStartTalks } from "../actions/preStartTalk"

export default async function Page() {
  const pendingPreStartTalks = await getPendingPreStartTalks();
  return (
    <div>
      
    </div>
  )
}
