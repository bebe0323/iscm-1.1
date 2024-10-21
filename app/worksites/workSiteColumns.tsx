"use client";

import { ColumnDef } from "@tanstack/react-table";

export type WorkSiteTable = {
  id: string,
  address: string,
  status: number,
  startedAt: Date,
  endedAt: Date,
}

export const workSiteColumns: ColumnDef<WorkSiteTable>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
]
