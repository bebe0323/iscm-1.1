"use client";

import * as React from "react"
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// imports for components
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserClient } from "@/app/types/user";
import { columns } from "@/app/users/columns";
import { DataTable } from "@/app/users/data-table";
import { TypeWorkSiteClient } from "@/app/types/workSite";


export default function PreStartForm({
  users,
  workSites,
}: {
  users: UserClient[],
  workSites: TypeWorkSiteClient[],
}) {
  // const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date>()
  const [rowSelection, setRowSelection] = React.useState({})

  const handleSubmit = async (formData: FormData) => {
    // TODO: fix this request
    setLoading(true);
    console.log(formData);
    console.log(rowSelection);
    console.log(date);
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
        <div className="flex">
          <p>DATE</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
                disabled={isLoading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="mt-8">
          <p className="bg-stone-200">DAILY WORK ACTIVITIES</p>
          <Textarea name="daily-work-activities" />
        </div>
        <div className="mt-8">
          <p className="bg-stone-200">SAFETY</p>
          <Textarea name="safety" />
        </div>
        <div className="mt-8">
          <p className="mb-2">Choose workers</p>
          <DataTable
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            columns={columns}
            data={users}
          />
        </div>
        <Button className="w-full mt-5">Create</Button>
      </form>
    </div>
  )
}
