"use server";
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

/**
 * Creates a new form for a user.
 *
 * @param {IForm} payload - The form data to be created.
 * @param {string} userId - The ID of the user.
 * @return {Promise<{ data: any; } | { error: string; }>} - A promise that resolves to an object with a success message if the form is created successfully, or an object with an error message if the user is not found.
 */
export const handleCreateForm = async (
  payload: IForm,
  userId: string
): Promise<{ data?: any; error?: string }> => {
  try {
    console.log("inn");
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found" };
    }
    const formsPayload = [...user.forms, payload];
    const data: any = await User.findOneAndUpdate(
      { _id: userId },
      { forms: formsPayload },
      { new: true }
    );
    const updatedForms = JSON.parse(JSON.stringify(data?.forms || []));
    const createdForm = updatedForms?.[updatedForms?.length - 1];

    // TODO: verify if updatedForms?.[updatedForms?.length - 1] is returning saved form data along with _id or not
    return { data: createdForm };
  } catch (error) {
    return { error: error?.toString() };
  }
};
