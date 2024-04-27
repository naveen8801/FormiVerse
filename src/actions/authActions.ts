"use server";
import User from "@/Models/User";
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
      }).save();

      return { msg: "User created successfully" };
    } else {
      return { error: "User already exist with this email" };
    }
  } catch (error) {
    return { error: error?.toString() };
  }
};
