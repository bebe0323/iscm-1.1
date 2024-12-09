"use server";

import { UserModel } from "../models/User";
import { TypeUserClient } from "../types/user";
import { connectMongoDb } from "./mongodb";

export async function getUsers({
  role,
  index
}: {
  role: number,
  index: number
}) {
  // todo: filter for role and index (pagination) in the future
  // Ensure mongoose connection is established
  await connectMongoDb();

  // lean(): return plain javascript object
  const users = await UserModel.find()
    .lean<TypeUserClient[]>()
    .select('_id name email role')
    .exec();
  
  // _id: mongoose.Types.ObjectId
  // converting into string
  const plainUsers = users.map((user) => ({
    ...user,
    _id: user._id.toString(),
  }));

  return plainUsers;
}
