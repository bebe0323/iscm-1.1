
import { getWorkSites } from "../actions/workSite";

import { DataTableNoSelection } from "../users/data-table";
import { workSiteColumns } from "./workSiteColumns";

export default async function Page() {
  const data = await getWorkSites({ status: 0 });
  return (
    <div>
      <DataTableNoSelection columns={workSiteColumns} data={data} />
    </div>
  )
}
