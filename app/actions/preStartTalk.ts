"use server";
import mongoose from "mongoose";
import { getJwtPayload } from "./auth";
import { PreStartTalkModel } from "../models/PreStartTalk";

function idToMongooseObjectId(id: string) {
  return new mongoose.Types.ObjectId(id);
}

export async function postPreStartTalk({
  formData,
  workerIds,
  jobDate,
}: {
  formData: FormData,
  workerIds: string[],
  jobDate: Date | undefined,
}) {
  try {
    if (!jobDate) {
      throw new Error("Choose date!")
    }
    // retrieving data from form
    const workSiteId = formData.get("workSite")?.toString();
    const dailyWorkActivities = formData.get("dailyWorkActivities")?.toString();
    const safety = formData.get("safety")?.toString();
    if (!workSiteId) {
      throw new Error("choose worksite");
    }
    if (!dailyWorkActivities) {
      throw new Error("fill daily work activities");
    }
    if (!safety) {
      throw new Error("fill safety");
    }

    // getting user id from jwt token
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload) {
      throw new Error("user doesn't have an userId")
    }

    // checking user role
    if (jwtPayload.role < 1) {
      throw new Error("admins can create preStartTalk");
    }

    // converting string ids to mongoose.Types.ObjectId
    const userId = idToMongooseObjectId(jwtPayload._id);
    const mongooseWorkSiteId = idToMongooseObjectId(workSiteId);
    const mongooseWorkerIds = workerIds.map(idToMongooseObjectId);
    const newPreStartTalk = new PreStartTalkModel({
      workSiteId: mongooseWorkSiteId,
      createdBy: userId,
      jobDate: jobDate,
      workerIds: mongooseWorkerIds,
      dailyWorkActivities: dailyWorkActivities,
      safety: safety,
    });
    await newPreStartTalk.save();
    return {
      success: true,
    }
  } catch (err) {
    if (err instanceof mongoose.Error || err instanceof Error) {
      console.log(err.message);
      return {
        success: false,
        message: err.message,
      };
    } else {
      return {
        success: false,
        message: "unknown error",
      };
    }
  }
}
