import mongoose from "mongoose";
import { Form } from "@/models/Form";

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already exist"],
      required: [true, "Username is required"],
    },
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    forms: [Form],
  },
  { timestamps: true }
);

export default mongoose?.models?.User || mongoose.model("User", User);
