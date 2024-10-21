"use client";

import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function virtualWait(): Promise<void> {
  console.log("Wait for 5 seconds...");
  await wait(5000);
  console.log("5 seconds have passed!");
}

export default function CreateWorksite() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget); // Get form data properly
    console.log(formData);
    await virtualWait();
    
    // TODO: write back-end request
    setLoading(false);
  }

  return (
    
    <div className="flex flex-col max-w-3xl mx-auto mt-10">
      <div className="text-center">
        <p className="text-3xl font-bold">CREATE WORKSITE</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <p className="mb-3">Address:</p>
            <Input name="address" className="mb-3" />
          </div>
          <Button disabled={isLoading} className="w-full">CREATE</Button>
        </form>
      </div>
    </div>
  )
}
