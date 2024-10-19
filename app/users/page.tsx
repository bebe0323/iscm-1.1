import { getUsers } from "../actions/users";
import { UserTable, columns } from "./columns"
import { DataTable } from "./data-table";

async function getData(): Promise<UserTable[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      role: 1,
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      role: 1,
      email: "ab@example.com",
    },
    {
      id: "728ed52f",
      role: 1,
      email: "abc@example.com",
    },
    // ...
  ]
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