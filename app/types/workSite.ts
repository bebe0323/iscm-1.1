import { Types } from "mongoose";

export type TypeWorkSiteDb = {
  _id: Types.ObjectId;
  created_by: Types.ObjectId;
  address: string;
  createdAt: Date;
  startedAt: Date | null;
  endedAt: Date | null;
  status: number; // [0,2]: 0-not started, 1-in progress, 2-finished
}

// mongoose objects converted into string
export type TypeWorkSiteClient = {
  _id: string;
  created_by: string;
  address: string;
  createdAt: Date;
  startedAt: Date | null;
  endedAt: Date | null;
  status: number; // [0,2]: 0-not started, 1-in progress, 2-finished
}
