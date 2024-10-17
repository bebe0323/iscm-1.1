import { cookies } from "next/headers"
import Link from "next/link";
import {
  Users,
  LayoutDashboard,
  Database,
  Frame
} from "lucide-react";
import SignoutButton from "./SignoutButton";

export default function NavbarServer() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth");
  // unauthorized user
  if (!authCookie) {
    return (
      <div>
        <div>
          <p>general</p>
          <Link href={'/sign-in'}>Sign in</Link>
          <Link href={'/sign-up'}>Sign up</Link>
        </div>



        <div>general</div>
        <div>
        </div>
      </div>
    )
  }


  return (
    <div className="h-full flex flex-col justify-between ml-4 mr-4 text-zinc-700">
      <div className="flex flex-col">
        <div className="flex my-4">
          <Frame className="navbar-icon" />
          <p className="text-black font-semibold">ISCM</p>
        </div>
        <div className="mt-2">
          <p className="text-xs font-bold mb-2 tracking-wide">GENERAL</p>
          <Link href={"/todo"} className="navbar-element">
            <Users className="navbar-icon" />
            <p>Users</p>
          </Link>
          <Link href={"/todo"} className="navbar-element">
            <LayoutDashboard className="navbar-icon"/>
            <p className="">Dashboard</p>
          </Link>
          <Link href={"/todo"} className="navbar-element">
            <Database className="navbar-icon"/>
            <p>Database</p>
          </Link>
        </div>

        <div className="mt-2">
          <p className="text-xs font-bold mb-2 tracking-wide">ADMIN</p>
          <Link href={"/todo"} className="navbar-element">
            <Users className="navbar-icon" />
            <p>pre-start talk</p>
          </Link>
          <Link href={"/todo"} className="navbar-element">
            <LayoutDashboard className="navbar-icon"/>
            <p className="">Option 1</p>
          </Link>
          <Link href={"/todo"} className="navbar-element">
            <Database className="navbar-icon"/>
            <p>Option 2</p>
          </Link>
        </div>
      </div>
      <div className="mb-4">
        <SignoutButton />
      </div>
    </div>
  )
}