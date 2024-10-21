import mongoose, { Types } from "mongoose";
import { cookies } from "next/headers"; 

interface DbWorksite {
  _id: Types.ObjectId;
  created_by: Types.ObjectId;
  address: string;
  createdAt: Date;
  startedAt: Date | null;
  endedAt: Date | null;
  status: number; // [0,2]: 0-not started, 1-in progress, 2-finished
}

export async function postWorkSite({
  address
}: {
  address: string,
}) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth")?.value;
}
