import { getUsers } from "../actions/users";
import { UserType } from "../types/user";
import { UserTable, columns } from "./columns"
import { DataTable } from "./data-table";

async function getData(): Promise<UserType[]> {
  const users = await getUsers({role: 0, index: 0});
  return users;
}

// TODO: complete workers page
export default async function Page() {
  // const users = await getUsers({ role: 0, index: 0 });
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}