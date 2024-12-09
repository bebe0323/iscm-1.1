import { Types } from "mongoose";
import { TypeUserDb, TypeUserClient } from "./user";

export type TypeWorkSiteDb = {
  _id: Types.ObjectId;
  createdBy: Types.ObjectId;
  address: string;
  createdAt: Date;
  startDate: Date | null;
  endDate: Date | null;
  status: number; // [0,2]: 0-not started, 1-in progress, 2-finished
}

// type of workSite where createdBy field is populated
export type TypeWorkSiteUserPopulatedDb = Omit<TypeWorkSiteDb, "createdBy"> & {
  createdBy: TypeUserDb;
}

// mongoose objects converted into string
export type TypeWorkSiteClient = {
  _id: string;
  // createdBy: TypeUserClient;
  address: string;
  createdAt: Date;
  startDate: Date | null;
  endDate: Date | null;
  status: number; // not started, in progress, finished
  // flattened 'createdBy' field
  createdById: string;
  createdByName: string;
  createdByEmail: string;
  createdByRole: number;
}

// type for worksite list where following fields are omitted
// 1. all fields related to the user who created it
// 2. createdAt
export type TypeWorkSiteList = Omit<TypeWorkSiteClient, "createdById" |
                                                        "createdByName" |
                                                        "createdByEmail" |
                                                        "createdByRole" |
                                                        "createdAt"
                                                        >;
