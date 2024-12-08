import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TypeUserClient } from "../types/user";
import { redirect } from "next/navigation";
import { signout } from "../actions/auth";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JSON_KEY!);

export default async function Page() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth")?.value;
  if (!authCookie) {
    redirect("/login");
  }
  let user: TypeUserClient | null = null;
  try {
    const { payload } = await jwtVerify(authCookie, SECRET) as { payload: TypeUserClient };
    // const decoded = jwt.verify(authCookie, process.env.JSON_KEY!) as TypeUserClient;
    user = payload;
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
