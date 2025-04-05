"use server";
import User from "@/models/User";
import connectDB from "@/helpers/ConnectDB";
import { hasPassword } from "@/helpers/passwordManager";
import sendEmail from "@/lib/sendEmail";

export const handleUserSignUp = async (data: {
  email: string;
  password: string;
  username: string;
  fullname: string;
}): Promise<{ msg?: string; error?: string }> => {
  try {
    await connectDB();
    const { username, email, password, fullname } = data;
    const userCheck = await User.findOne({ email: email, isGoogleUser: false });
    if (!userCheck) {
      const hash = await hasPassword(password);
      const newUser = await new User({
        username: username,
        email: email,
        password: hash,
        fullname: fullname,
        isGoogleUser: false,
      }).save({
        validateBeforeSave: true,
      });

      // Send email on user create
      const { msg, error } = await sendEmail({
        receiverEmail: email,
        data: { name: fullname },
        emailType: "WELCOME",
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

export const handleUpdateUserProfile = async (
  userId: string,
  data: {
    fullname: string;
    password: string;
  }
): Promise<{ data?: any; error?: string }> => {
  try {
    await connectDB();
    const { fullname, password } = data;
    const payload: any = {};
    if (fullname) {
      payload["fullname"] = fullname;
    }
    if (password) {
      const hash = await hasPassword(password);
      payload["password"] = hash;
    }
    console.log({ payload, userId });
    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      payload,
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return { error: "User not found" };
    }

    return { data: updatedUser?.toJSON() };
  } catch (err: any) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
      return { error: "Username must be unique" };
    } else if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return { error: "Email must be unique" };
    }
    return { error: err?.toString() };
  }
};
