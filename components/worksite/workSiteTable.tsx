import { TypeWorkSiteClient } from "@/app/types/workSite";
import Link from "next/link";

function formatDate(date: Date | null) {
  if (!date) {
    return "Not date";
  }
  const formattedDate = date.toLocaleDateString('en-AU', { 
    day: '2-digit', 
    month: 'long', // Use 'long' for full month name
    year: 'numeric'
  });
  return formattedDate;
}

export function WorkSiteTable({
  workSites
}: {
  workSites: TypeWorkSiteClient[]
}) {
  return (
    <div className=" mt-10 border rounded-md">
      <div className="flex w-full px-2 text-zinc-500 text-sm py-2">
        <div className="w-1/4">Status</div>
        <div className="w-1/4">Address</div>
        <div className="w-1/4">Started at</div>
        <div className="w-1/4">Ended at</div>
      </div>
      {workSites.map((workSite) => (
        <div key={workSite._id} className="border-t flex w-full px-2 py-1.5">
          <div className="w-1/4">{workSite.status}</div>
          <Link className="w-1/4" href={`/worksites/${workSite._id}`}>{workSite.address}</Link>
          <div className="w-1/4">{formatDate(workSite.startedAt)}</div>
          <div className="w-1/4">{formatDate(workSite.endedAt)}</div>
        </div>
      ))}
    </div>
  )
}
