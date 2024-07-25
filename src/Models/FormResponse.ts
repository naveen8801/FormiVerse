import mongoose from "mongoose";

export const FormResponse = new mongoose.Schema({
  data: {
    type: Object,
    required: [true, "data is required"],
  },
  createdAt: {
    type: Date,
  },
});
