"use client";

import Link from "next/link";
import { MyButton } from "@/components/ui/myButton";
import { MyInput } from "@/components/ui/myInput";
import { signup } from "../actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await signup(formData);
    if (!result.success) {
      if (result.message) {
        setError(result.message);
      } else {
        setError("An unexpected error occurred during signup");
      }
    } else if (result.success) {
      router.push("/sign-in");
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="border rounded-lg border-stone-300 p-5">
        <p className="text-xl font-semibold mb-2">Create an account</p>
        <p className="text-sm text-neutral-60 mb-3">Enter your email below to login to your account</p>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form action={handleSubmit}>
          <div className="my-3">
            <p className="text-sm font-semibold mb-1.5">Email</p>
            <MyInput name="email" type="email" placeholder="Email" required />
          </div>
          <div>
            <div>Password</div>
            <MyInput name="password" type="password" placeholder="password" required />
          </div>
          <MyButton className="mt-4">Sign up</MyButton>
        </form>
        <div className="flex justify-center text-sm mt-4">
          <p className="mr-2">Already have an account?</p>
          <Link href="/sign-in" className="underline underline-offset-2">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
