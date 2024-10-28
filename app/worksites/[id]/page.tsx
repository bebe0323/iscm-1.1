// only ultra-admins can see this page

import { getWorkSite } from "@/app/actions/workSite"
import { ClientWorkSite } from "@/components/worksite/clientWorkSite";

export default async function Page({ params }: { params: { id: string } }) {
  const workSite = await getWorkSite({id: params.id});

  if (!workSite) {
    return (
      <div>
        Worksite with id: {params.id} does not exist
      </div>
    )
  }
  
  return <ClientWorkSite workSite={workSite} />
}