"use server";
import User from "./../models/User";
import connectDB from "@/helpers/ConnectDB";
import { hasPassword } from "@/helpers/passwordManager";

export const handleUserSignUp = async (data: {
  email: string;
  password: string;
  username: string;
  fullname: string;
}): Promise<{ msg?: string; error?: string }> => {
  try {
    await connectDB();
    const { username, email, password, fullname } = data;
    const userCheck = await User.findOne({ email: email });
    if (!userCheck) {
      const hash = await hasPassword(password);
      const newUser = await new User({
        username: username,
        email: email,
        password: hash,
        fullname: fullname,
      }).save({
        validateBeforeSave: true,
      });

      return { msg: "User created successfully" };
    } else {
      return { error: "User already exist with this email" };
    }
  } catch (err: any) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
      return { error: "Username must be unique" };
    } else if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return { error: "Email must be unique" };
    }
    return { error: err?.toString() };
  }
};
