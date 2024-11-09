"use client";

import { useState, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { postWorkSite } from "@/app/actions/workSite";
import { toast } from "sonner";

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function virtualWait(): Promise<void> {
  console.log("Wait for 5 seconds...");
  await wait(5000);
  console.log("5 seconds have passed!");
}

export function CreateWorksite() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget); // Get form data properly
    const res = await postWorkSite(formData);
    if (res.success) {
      if (formRef.current) formRef.current.reset()
      if (inputRef.current) inputRef.current.value = ''
      toast("Worksite successfully created");
    } else {
      toast(res.message);
    }
    setLoading(false);
  }

  return (
    
    <div className="flex flex-col max-w-3xl mx-auto mt-10">
      <div className="text-center">
        <p className="text-3xl font-bold">CREATE WORKSITE</p>
      </div>
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <p className="mb-3 pt-1 mr-3">Address:</p>
            <Input ref={inputRef} name="address" className="mb-3" />
          </div>
          <Button disabled={isLoading} className="w-full">CREATE</Button>
        </form>
      </div>
    </div>
  )
}
