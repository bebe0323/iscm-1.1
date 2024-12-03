import { Types } from "mongoose";

// type of the preStartTalk in the database
export type TypePreStartTalkDb = {
  _id: Types.ObjectId;
  workSiteId: Types.ObjectId;
  createdBy: Types.ObjectId;
  jobDate: Date;
  workers: Array<{
    workerId: Types.ObjectId,
    status: number,
    _id: Types.ObjectId,
  }>;
  dailyWorkActivities: string;
  safety: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

// server to client (nested objects can't passed)
export type TypePreStartTalkClient = {
  _id: string;
  workSiteId: string;
  createdBy: string;
  jobDate: Date;
  //
  workerIds: string[],
  status: number[],
  //
  dailyWorkActivities: string;
  safety: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
