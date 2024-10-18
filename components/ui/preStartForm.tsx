"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "./button";


export default function PreStartForm() {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    console.log(formData);
    setLoading(false);
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto mt-10">
      <div className="text-center">
        <p className="text-3xl font-bold">Toolbox/Pre-Start Talks</p>
      </div>
      <div className="mt-5 px-4">
        <p>
          All Toolbox/Pre-start Talks undertaken on behalf of 
          <i>ISCM Pry Ltd</i> are recorded on this form and 
          signed by participants.
        </p>
      </div>
      <div className="mt-3 px-4">
        <p>
          All corrective actions noted on this form are implemented
          and signed by the nominated person. It is the responsibility
          of the Works Supervisor to ensure that all corrective actions
          are completed and reviewed for effectiveness.
        </p>
      </div>
      <div className="mt-8">
        <p className="text-center bg-stone-200">TOOLBOX/PRESTART</p>
      </div>
      <form action={handleSubmit}>
        <div className="flex">
          <p>WORKPLACE</p>
          <Select name="workplace">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-8">
          <p className="bg-stone-200">DAILY WORK ACTIVITIES</p>
          <Textarea name="daily-work-activities" />
        </div>
        <div className="mt-8">
          <p className="bg-stone-200">SAFETY</p>
          <Textarea name="safety" />
        </div>
        <Button className="w-full mt-5">Create</Button>
      </form>
      
    </div>
  )
}