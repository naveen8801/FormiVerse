"use server";
import User from "@/models/User";
import connectDB from "@/helpers/ConnectDB";
import { IForm } from "@/types";
import { revalidatePath } from "next/cache";
import sendEmail from "@/lib/sendEmail";
import Form from "@/models/Form";

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
    const forms = await Form.find({ "author._id": userId });
    if (!forms) {
      return { error: "forms not found" };
    }
    return { data: forms || [] };
  } catch (error) {
    return { error: error?.toString() };
  }
};

/**
 * Creates a new form for a user.
 *
 * @param {IForm} payload - The form data to be created.
 * @return {Promise<{ data: any; } | { error: string; }>} - A promise that resolves to an object with a success message if the form is created successfully, or an object with an error message if the user is not found.
 */
export const handleCreateForm = async (
  payload: IForm
): Promise<{ data?: any; error?: string }> => {
  try {
    await connectDB();
    const formsPayload = { ...payload, createdAt: Date.now() };
    const form = await new Form(formsPayload).save({
      validateBeforeSave: true,
    });
    revalidatePath("/dashboard");
    return { data: form };
  } catch (error) {
    return { error: error?.toString() };
  }
};

export const getFormById = async (formId: string) => {
  try {
    console.log({ formId });
    await connectDB();
    const form = await Form.findById(formId);
    if (!form) {
      return { error: "Form not found" };
    }
    return { data: form };
  } catch (error) {
    return { error: error?.toString() };
  }
};

export const getFormResponsesById = async (formId: string) => {
  try {
    await connectDB();
    const form = await Form.findById(formId);
    if (!form) {
      return { error: "Form not found" };
    }

    return { data: form?.toJSON() };
  } catch (error) {
    return { error: error?.toString() };
  }
};

export const handleFormDeletion = async (formId: string) => {
  try {
    await connectDB();
    const form = await Form.findByIdAndDelete(formId);
    if (!form) {
      return { error: "Form not found" };
    }
    revalidatePath("/dashboard");
    return { data: {} };
  } catch (error) {
    return { error: error?.toString() };
  }
};

export const handleSubmitFormResponse = async (
  formId: string,
  payload: any
) => {
  try {
    await connectDB();
    const form = await Form.findById(formId);
    if (!form) {
      return { error: "Form not found" };
    }

    const responsePayload = { data: payload, createdAt: Date.now() };
    await Form.findOneAndUpdate(
      { _id: formId },
      {
        responses: [...form.responses, responsePayload],
      },
      { new: true }
    )
      .then(async (data) => {
        // Send email for response notification
        const { msg, error } = await sendEmail({
          receiverEmail: form?.author?.email,
          data: {
            name: form?.author?.username,
            form: data,
            response: responsePayload,
          },
          emailType: "NEW_RESPONSE",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    revalidatePath("/dashboard");

    return { data: {} };
  } catch (error) {
    return { error: error?.toString() };
  }
};
