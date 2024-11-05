import { Types } from "mongoose";

// type of the user in the database
export type TypeUserDb = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: number;
  createdAt: Date;
}

// user type that is exposed to client side
export type UserClient = {
  _id: string;
  name: string;
  email: string;
  role: number;  // 0 - worker, 1 - admin, 2-ultra admin
  id: string;
  iat?: number;   // issued at
  exp?: number;   // expiration
}
