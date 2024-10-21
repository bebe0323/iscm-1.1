import mongoose, { Types } from "mongoose";
import { UserModel } from "../models/User";
import { UserClient } from "../types/user";
import { connectMongoDb } from "./mongodb";

interface DbUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: number;
  createdAt: Date;
}

export async function getUsers({
  role,
  index
}: {
  role: number,
  index: number
}) {

  // Ensure mongoose connection is established
  await connectMongoDb();

  // lean(): return plain javascript object
  const users = await UserModel.find().lean<DbUser[]>().exec();

  // Convert _id to string for each user
  const plainUsers = users.map(({ _id, password, ...rest }) => ({
    ...rest,
    id: _id.toString()
  }));

  return plainUsers as UserClient[];
}
