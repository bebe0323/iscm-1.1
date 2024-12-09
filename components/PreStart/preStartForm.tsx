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
import { TypeUserClient } from "@/app/types/user";
import { columns } from "@/app/users/columns";
import { DataTable } from "@/app/users/data-table";
import { TypeWorkSiteList } from "@/app/types/workSite";
import { postPreStartTalk } from "@/app/actions/preStartTalk";
import { toast } from "sonner";


export default function PreStartForm({
  users,
  workSites,
}: {
  users: TypeUserClient[],
  workSites: TypeWorkSiteList[],
}) {
  // const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date>()
  const [rowSelection, setRowSelection] = React.useState({})

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const selectedRows = Object.keys(rowSelection);
    const workerIds = [];
    for (const row of selectedRows) {
      workerIds.push(users[parseInt(row)]._id);
    }
    const res = await postPreStartTalk({
      formData: formData,
      workerIds:workerIds,
      jobDate: date,
    })
    if (!res.success) {
      toast(res.message)
    } else {
      toast("successfully created");
      // redirect to the pre-start-talk page
    }
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
          <p>WORKSITE</p>
          <Select name="workSite">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pick Worksite" />
            </SelectTrigger>
            <SelectContent>
              {workSites.map((workSite) => (
                <SelectItem key={workSite._id} value={workSite._id}>
                    {workSite.address}
                </SelectItem>
              ))}
              {/* <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem> */}
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
                required={true}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="mt-8">
          <p className="bg-stone-200">DAILY WORK ACTIVITIES</p>
          <Textarea name="dailyWorkActivities" />
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
