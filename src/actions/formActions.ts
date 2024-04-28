import User from "@/models/User";
import connectDB from "@/helpers/ConnectDB";

export const handleGetUserForms = async (userId: string) => {
  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found" };
    }
    return { data: user.forms || [] };
  } catch (error) {
    return { error: error?.toString() };
  }
};
