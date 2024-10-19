import mongoose from "mongoose";
import { UserModel } from "../models/User";

export async function getUsers({
  role,
  index
}: {
  role: number,
  index: number
}) {
  // todo: check current user role
  const users = await UserModel.find();
  console.log(users);
  return users;
}
