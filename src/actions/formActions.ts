"use server";
import User from "@/models/User";
import connectDB from "@/helpers/ConnectDB";
import { IForm } from "@/types";
import { revalidatePath } from "next/cache";

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
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found" };
    }
    const formsPayload = [...user.forms, { ...payload, createdAt: Date.now() }];
    const data: any = await User.findOneAndUpdate(
      { _id: userId },
      { forms: formsPayload },
      { new: true }
    );
    const updatedForms = JSON.parse(JSON.stringify(data?.forms || []));
    const createdForm = updatedForms?.[updatedForms?.length - 1];
    revalidatePath("/dashboard");
    return { data: createdForm };
  } catch (error) {
    return { error: error?.toString() };
  }
};

export const getFormById = async (userId: string, formId: string) => {
  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found" };
    }
    const form = user?.forms?.find(
      (form: IForm) => form._id?.toString() === formId
    );
    if (!form) {
      return { error: "Form not found" };
    }
    return { data: form };
  } catch (error) {
    return { error: error?.toString() };
  }
};

export const getFormResponsesById = async (
  userId: string,
  formId: string,
  isReturnFormData: boolean = false
) => {
  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found" };
    }
    const form = user?.forms?.find(
      (form: IForm) => form._id?.toString() === formId
    );
    if (!form) {
      return { error: "Form not found" };
    }

    return { data: form?.toJSON() };
  } catch (error) {
    return { error: error?.toString() };
  }
};

export const handleFormDeletion = async (userId: string, formId: string) => {
  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found" };
    }
    const form = user?.forms?.find(
      (form: IForm) => form._id?.toString() === formId
    );
    if (!form) {
      return { error: "Form not found" };
    }
    const data: any = await User.findOneAndUpdate(
      { _id: userId },
      {
        forms: user?.forms.filter(
          (form: IForm) => form._id?.toString() !== formId
        ),
      },
      { new: true }
    );
    revalidatePath("/dashboard");
    return { data: {} };
  } catch (error) {
    return { error: error?.toString() };
  }
};

export const handleSubmitFormResponse = async (
  userId: string,
  formId: string,
  payload: any
) => {
  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found" };
    }
    const idx = user?.forms?.findIndex(
      (form: IForm) => form._id?.toString() === formId
    );
    if (idx == -1) {
      return { error: "Form not found" };
    }

    let newFormsArr = user?.forms;
    newFormsArr[idx].responses = [
      ...newFormsArr[idx].responses,
      { data: payload, createdAt: Date.now() },
    ];
    const data: any = await User.findOneAndUpdate(
      { _id: userId },
      {
        forms: newFormsArr,
      },
      { new: true }
    );
    return { data: {} };
  } catch (error) {
    return { error: error?.toString() };
  }
};
