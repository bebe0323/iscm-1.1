"use client";

import { TypeWorkSiteClient } from "@/app/types/workSite";
 
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
 
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateWorkSite } from "@/app/actions/workSite";

function DateComponent({
  date
}: {
  date: Date
}) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  return (
    <div className="flex">
      <p className="pr-2">{months[month]}</p>
      <p>{day}</p>
      <p className="pr-2">,</p>
      <p>{year}</p>
    </div>
  )
}

function DatePicker({
  date,
  setDate,
}: {
  date: Date | undefined,
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
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
  );
}

export function ClientWorkSite({
  workSite
}: {
  workSite: TypeWorkSiteClient
}) {
  const [startDate, setStartDate] = React.useState<Date | undefined>(workSite.startedAt || undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(workSite.endedAt || undefined);

  const handleSubmit = async (formData: FormData) => {
    console.log(formData);
    console.log(startDate);
    console.log(endDate);
    const newStatus = formData.get("status")?.toString();
    await updateWorkSite({
      _id: workSite._id,
      newStatus: newStatus,
      startDate: startDate,
      endDate: endDate,
    });
  }

  return (
    <div className="w-full">
      <div className="font-bold text-2xl my-4 ml-4">Worksite</div>
      <form className="md:w-9/12 mx-auto" action={handleSubmit}>
        <div className="flex">
          <div className="font-bold">{workSite.address}</div>
        </div>
        <div className="border border-b"></div>
        <div className="flex justify-between py-3">
          <p className="font-semibold">Status</p>
          <div>{workSite.status}</div>
          <Select name="status">
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Pick a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Not Started</SelectItem>
              <SelectItem value="1">In Progress</SelectItem>
              <SelectItem value="2">Finished</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="border border-b"></div>
        <div className="flex justify-between py-3">
          <p className="font-semibold">Started at</p>
          <div>
            {workSite.startedAt && <DateComponent date={workSite.startedAt} />}
            {!workSite.startedAt && <p>Not started</p>}
          </div>
          <DatePicker date={startDate} setDate={setStartDate} />
        </div>
        <div className="border border-b"></div>
        <div className="flex justify-between py-3 ">
          <p className="font-semibold">Finished at</p>
          <div>
            {workSite.endedAt && <DateComponent date={workSite.endedAt} />}
            {!workSite.endedAt && <p>Not Finished</p>}
          </div>
          <DatePicker date={endDate} setDate={setEndDate} />
        </div>
        <div className="border border-b"></div>
        <div className="flex">
          <p className="font-semibold">Created by</p>
          <div>{workSite.created_by}</div>
        </div>
        <div className="flex">
          <p className="font-semibold">Created at</p>
          <div>{<DateComponent date={workSite.createdAt} />}</div>
        </div>
        <Button>Save changes</Button>
      </form>
      
    </div>
  )
}
