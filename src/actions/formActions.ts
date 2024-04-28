import User from "@/models/User";
import connectDB from "@/helpers/ConnectDB";
import { IForm } from "@/types";

/**
 * Retrieves the forms associated with a given user.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<{ data: Form[]; } | { error: string; }>} - A promise that resolves to an object containing the user's forms if successful, or an object with an error message if the user is not found.
 */
export const handleGetUserForms = async (
  userId: string
): Promise<{ data?: IForm[]; error?: string | undefined }> => {
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
