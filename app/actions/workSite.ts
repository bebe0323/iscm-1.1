"use server";
import mongoose from "mongoose";
import { getJwtPayload } from "./auth";
import { connectMongoDb } from "./mongodb";
import { WorkSiteModel } from "../models/WorkSite";
import {
  TypeWorkSiteDb,
  TypeWorkSiteClient,
  TypeWorkSiteUserPopulatedDb,
  TypeWorkSiteList
} from "../types/workSite";

export async function postWorkSite(formData: FormData) {
  try {
    // getting user id from jwt token
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload) {
      throw new Error("user doesn't have an userId")
    }
    
    // checking user role
    if (jwtPayload.role < 1) {
      throw new Error("admins can create worksite");
    }
    
    // address: from client side form
    const address = formData.get("address")?.toString();
    if (!address) {
      throw new Error("address is empty");
    }
    
    // connect to the db
    await connectMongoDb();

    // converting userId from string to mongoose.Types.ObjectId
    const userId = new mongoose.Types.ObjectId(jwtPayload._id);

    const newAddress = new WorkSiteModel({
      createdBy: userId,
      address: address,
      // createdAt: default Date.now()
      // startDate: default null
      // endDate: default null
      // status: default 0
    });

    await newAddress.save();

    return { success: true };

  } catch (err) {
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

  let workSites = [];

  // status=-1, fetching all worksites
  if (status === -1) {
    workSites = await WorkSiteModel.find()
                  .lean<TypeWorkSiteDb[]>()
                  .select("address startDate endDate status")
                  .exec();
  } else {
    workSites = await WorkSiteModel.find({ status: status })
                  .lean<TypeWorkSiteDb[]>()
                  .select("address startDate endDate status")
                  .exec();
  }

  const plainWorkSites = workSites.map((workSite) => ({
    ...workSite,
    _id: workSite._id.toString(),
  }))
  return plainWorkSites as TypeWorkSiteList[];
}

function mapWorkSiteToClient(workSite: TypeWorkSiteUserPopulatedDb): TypeWorkSiteClient {
  return {
    _id: workSite._id.toString(),
    address: workSite.address,
    createdAt: workSite.createdAt,
    startDate: workSite.startDate,
    endDate: workSite.endDate,
    status: workSite.status,
    // flattened 'createdBy' field
    createdById: workSite.createdBy._id.toString(),
    createdByName: workSite.createdBy.name,
    createdByEmail: workSite.createdBy.email,
    createdByRole: workSite.createdBy.role,
  };
}

export async function getWorkSite({
  id
}: {
  id: string
}) {
  await connectMongoDb();

  try {
    const workSite = await WorkSiteModel.findOne({
      _id: new mongoose.Types.ObjectId(id)
    })
      .lean<TypeWorkSiteUserPopulatedDb>()
      .populate("createdBy")
      .exec();

    if (!workSite) {
      throw new Error("worksite doesn't exist")
    }
    const clientWorkSite = mapWorkSiteToClient(workSite);
    return clientWorkSite;
  } catch (err) {
    return null;
  }
}

export async function updateWorkSite({
  _id,
  newStatus,
  startDate,
  endDate,
}: {
  _id: string,
  newStatus: number,
  startDate: Date | undefined,
  endDate: Date | undefined,
}) {
  await connectMongoDb();

  try {
    const workSiteObjectId = new mongoose.Types.ObjectId(_id);
    const filter = { _id: workSiteObjectId };
    const update = {
      startDate: startDate,
      endDate: endDate,
      status: newStatus,
    };

    const doc = await WorkSiteModel
      .findOneAndUpdate(filter, update, { new: true, lean: true })
      .populate("createdBy")
      .exec()

    if (!doc) {
      throw new Error("error in updating the document");
    }

    const plainWorkSite = mapWorkSiteToClient(doc as TypeWorkSiteUserPopulatedDb);
    return {
      success: true,
      data: plainWorkSite,
    };
  } catch (err: unknown) {
    if (err instanceof mongoose.Error || err instanceof Error) {
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
