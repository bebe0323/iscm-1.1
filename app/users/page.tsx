import { getUsers } from "../actions/users";
import { TypeUserClient} from "../types/user";
import { columns } from "./columns"
import { DataTableNoSelection } from "./data-table";

async function getData(): Promise<TypeUserClient[]> {
  const users = await getUsers({ role: 0, index: 0 });
  return users;
}

export default async function Page() {
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <DataTableNoSelection columns={columns} data={data} />
    </div>
  )
}
