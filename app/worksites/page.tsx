
import { getWorkSites } from "../actions/workSite";

import { DataTableNoSelection } from "../users/data-table";
import { workSiteColumns } from "./workSiteColumns";

export default async function Page() {
  const data = await getWorkSites({ status: 0 });
  return (
    <div className="container mx-auto py-10">
      <DataTableNoSelection columns={workSiteColumns} data={data} />
    </div>
  )
}
