import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserType } from "../types/user";
import { redirect } from "next/navigation";
import { signout } from "../actions/auth";

export default async function Page() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth")?.value;
  if (!authCookie) {
    redirect("/login");
  }
  let user: UserType | null = null;
  try {
    const decoded = jwt.verify(authCookie, process.env.JSON_KEY!) as UserType;
    user = decoded;
  } catch (err) {
    console.error("JWT verification failed:", err);
    await signout();
    redirect("/login");
  }

  if (!user) {
    return redirect("/login");
  }
  return (
    <div>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </div>
  );
}