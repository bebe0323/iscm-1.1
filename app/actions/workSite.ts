"use server";
import mongoose from "mongoose";
import { getJwtPayload } from "./auth";
import { connectMongoDb } from "./mongodb";
import { WorkSiteModel } from "../models/WorkSite";
import { TypeWorkSiteDb, TypeWorkSiteClient } from "../types/workSite";

export async function postWorkSite(formData: FormData) {
  try {
    // getting user id from jwt token
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload) {
      throw new Error("user doesn't have an userId")
    }
    
    // checking user role
    if (jwtPayload.role < 1) {
      throw new Error("user is not an Admin");
    }
    
    // address: from client side form
    const address = formData.get("address")?.toString();
    if (!address) {
      throw new Error("address is empty");
    }
    console.log('address: ', address);
    
    // connect to the db
    await connectMongoDb();

    // converting userId from string to mongoose.Types.ObjectId
    const userId = new mongoose.Types.ObjectId(jwtPayload.user_id);

    const newAddress = new WorkSiteModel({
      created_by: userId,
      address: address,
      // createdAt: default Date.now()
      // startedAt: default null
      // endedAt: default null
      // status: default 0
    });

    await newAddress.save();

    return { success: true };

  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message
      }
    } else {
      return {
        success: false,
        message: "An unexpected error occurred"
      }
    }
  }
}

export async function getWorkSites({
  status
}: {
  status: number,
}) {
  await connectMongoDb();

  let workSites: TypeWorkSiteDb[] = [];

  // status=-1, fetching all worksites
  if (status === -1) {
    workSites = await WorkSiteModel.find()
                  .lean<TypeWorkSiteDb[]>()
                  .exec();
  } else {
    workSites = await WorkSiteModel.find({ status: status })
                  .lean<TypeWorkSiteDb[]>()
                  .exec();
  }

  const plainWorkSites = workSites.map(({ _id, created_by, status, ...rest }) => ({
    ...rest,
    _id: _id.toString(),
    created_by: created_by.toString(),
    status: 
      status === 0 ? "not started" :
      status === 1 ? "in progress" :
      status === 2 ? "finished" :
      "unknown"  // fallback for any unexpected status value
  }))

  return plainWorkSites as TypeWorkSiteClient[];
}
