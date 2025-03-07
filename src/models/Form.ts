import mongoose from "mongoose";
import { FormResponse } from "@/models/FormResponse";

export const Form = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
  },
  formSchema: {
    type: String,
    required: [true, "Form schema is required"],
  },
  uiSchema: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
  },
  author: {
    _id: {
      type: String,
      required: [true, "Author user id is required"],
    },
    username: {
      type: String,
      required: [true, "Author username is required"],
    },
    email: {
      type: String,
      required: [true, "Author email is required"],
    },
  },
  responses: [FormResponse],
});

export default mongoose?.models?.Form || mongoose.model("Form", Form);
