import { Types } from "mongoose";

export type TypeWorkSiteDb = {
  _id: Types.ObjectId;
  createdBy: Types.ObjectId;
  address: string;
  createdAt: Date;
  startDate: Date | null;
  endDate: Date | null;
  status: number; // [0,2]: 0-not started, 1-in progress, 2-finished
}

// mongoose objects converted into string
export type TypeWorkSiteClient = {
  _id: string;
  createdBy: string;
  address: string;
  createdAt: Date;
  startDate: Date | null;
  endDate: Date | null;
  status: string; // not started, in progress, finished
}
