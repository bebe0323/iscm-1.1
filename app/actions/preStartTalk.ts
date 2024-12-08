"use server";
import mongoose from "mongoose";
import { getJwtPayload } from "./auth";
import { PreStartTalkModel } from "../models/PreStartTalk";
import { connectMongoDb } from "./mongodb";
import { TypePreStartTalkDb } from "../types/preStartTalk";

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
      throw new Error("Choose date!");
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
    const objectWorkers = mongooseWorkerIds.map((worker) => {
      return ({
        workerId: worker,
        status: 0,
      })
    })
    const newPreStartTalk = new PreStartTalkModel({
      workSiteId: mongooseWorkSiteId,
      createdBy: userId,
      jobDate: jobDate,
      workers: objectWorkers,
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

export async function getPendingPreStartTalks() {
  try {
    await connectMongoDb();
    // getting user id from jwt token
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload) {
      throw new Error("user doesn't have an userId")
    }
    //
    const preStartTalksDb = await PreStartTalkModel.find({
      'workers.workerId': idToMongooseObjectId(jwtPayload._id),
      'workers.status': 0,
    }).lean() as TypePreStartTalkDb[];

    // converting all the Types.ObjectId to string before passing into client side
    // workers object array divided into worderIds and status array
    const preStartTalksClient = preStartTalksDb.map(({
      workers,
      _id,
      workSiteId,
      createdBy,
      ...rest
    }) => ({
      ...rest,
      workerIds: workers.map((worker) => worker.workerId.toString()),
      status: workers.map((worker) => worker.status),
      _id: _id.toString(),
      workSiteId: workSiteId.toString(),
      createdBy: createdBy.toString(),
    }));

    return {
      success: true,
      data: preStartTalksClient,
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
