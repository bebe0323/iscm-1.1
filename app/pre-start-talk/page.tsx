import PreStartForm from "@/components/PreStart/preStartForm";
import { getUsers } from "../actions/users";

export default async function Page() {
  //
  const data = await getUsers({ role: 0, index: 0 });
  return (
    <PreStartForm data={data} />
  )
}
