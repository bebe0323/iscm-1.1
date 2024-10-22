"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeWorkSiteClient } from "../types/workSite";

export const workSiteColumns: ColumnDef<TypeWorkSiteClient>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "startedAt",
    header: "Started at",
  },
  {
    accessorKey: "endedAt",
    header: "Ended at",
  }
]
