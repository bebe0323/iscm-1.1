import PreStartForm from "@/components/PreStart/preStartForm";
import { getUsers } from "../actions/users";
import { getWorkSites } from "../actions/workSite";

export default async function Page() {
  //
  const users = await getUsers({ role: 0, index: 0 });
  // fetching in-progress worksites
  const workSites = await getWorkSites({ status: 1 });
  // todo: format worksites in PreStartForm component
  return (
    <PreStartForm users={users} workSites={workSites} />
  )
}
