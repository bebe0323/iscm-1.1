"use server";

import { UserModel } from "../models/User";
import { UserClient } from "../types/user";
import { connectMongoDb } from "./mongodb";
import { TypeUserDb } from "../types/user";

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
  const users = await UserModel.find().lean<TypeUserDb[]>().exec();

  // Convert _id to string for each user
  const plainUsers = users.map(({ _id, password, createdAt, ...rest }) => ({
    ...rest,
    _id: _id.toString()
  }));

  return plainUsers as UserClient[];
}
