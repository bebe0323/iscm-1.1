
import { WorkSiteTable } from "@/components/worksite/workSiteTable";
import { getWorkSites } from "../actions/workSite";

export default async function Page() {
  const data = await getWorkSites({ status: -1 });
  return (
    <div className="container mx-auto py-10">
      <div className="mx-5">
        <WorkSiteTable workSites={data} />
      </div>
    </div>
  )
}
