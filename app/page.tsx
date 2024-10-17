import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth");
  

  return (
    <div>
      Hi
    </div>
  );
}
