"use server";
import mongoose, { Types } from "mongoose";
import { isAdmin } from "./auth";

interface DbWorksite {
  _id: Types.ObjectId;
  created_by: Types.ObjectId;
  address: string;
  createdAt: Date;
  startedAt: Date | null;
  endedAt: Date | null;
  status: number; // [0,2]: 0-not started, 1-in progress, 2-finished
}

export async function postWorkSite(formData: FormData) {
  try {
    console.log('here');
    if (!(await isAdmin())) {
      throw new Error("only admins can create worksite");
    }
    const address = formData.get("address")?.toString();
    console.log(address);
    if (!address) {
      throw new Error("address is empty");
    }

  } catch (err) {

  }

}
