import mongoose from "mongoose";
import { UserModel } from "../models/User";
import { UserType } from "../types/user";
import { Document, Types } from "mongoose";

interface DbUser {
  email: string;
  password: string;
  role: number;
  createdAt: Date;
  _id: Types.ObjectId;
}

export async function getUsers({
  role,
  index
}: {
  role: number,
  index: number
}) {

  // Ensure mongoose connection is established
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }

  // lean(): return plain javascript object
  const users = await UserModel.find().lean<DbUser[]>().exec();

  // Convert _id to string for each user
  const plainUsers = users.map(({ _id, ...rest }) => ({
    ...rest,
    id: _id.toString()
  }));

  return plainUsers as UserType[];
}
