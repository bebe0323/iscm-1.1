"use server";
import { cookies } from 'next/headers';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { UserModel } from '../models/User';

const saltRounds = 10;

export async function signup(formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!email || !password) {
      throw new Error("Email or password is empty");
    }
    
    await mongoose.connect(process.env.MONGODB_URI!);
    // checking is there an user with same email in the database
    const userDB = await UserModel.findOne({ email: email }).exec();
    if (userDB) {
      throw new Error("User with a given email exist");
    }

    // ecrypting password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // storing in the database
    const newUser = new UserModel({ email: email, password: hash });
    await newUser.save();
    console.log('SIGNUP: ' + email);
  } catch (err) {
    console.log(err);
  }
}


export async function signin(formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      throw new Error("email or password is empty");
    }
    
    await mongoose.connect(process.env.MONGODB_URI!);
    const userDb = await UserModel.findOne({ email: email }).exec();
    if (!userDb) {
      throw new Error("User does not exist");
    }

    // checking password
    const isUser = bcrypt.compareSync(password, userDb.password);

    if (!isUser) {
      throw new Error("Wrong password");
    }

    const jwtKey = process.env.JSON_KEY!;
    const token = jwt.sign({
      email: email,
      role: 0,
    }, jwtKey, { expiresIn: '1h' });
    cookies().set("auth", token);
    console.log("SIGN-IN: " + email);
  } catch (err) {
    console.log(err);
  }
}

export async function signout() {
  cookies().delete("auth");
}