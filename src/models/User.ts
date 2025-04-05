import mongoose from "mongoose";

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
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
      // Removing the unique constraint as we'll handle it with a validator
      validate: {
        validator: async function (
          this: mongoose.Document & { isGoogleUser: boolean },
          email: string
        ) {
          // Skip validation if this is an existing document being updated
          if (!this.isNew) return true;

          // Find users with the same email and same isGoogleUser status
          const user = await (
            this.constructor as mongoose.Model<typeof User>
          ).findOne({
            email: email,
            isGoogleUser: this.isGoogleUser,
          });

          // If no user found with same email and same type, or it's the same document, it's valid
          return !user || this.id === user.id;
        },
        message: (props: any) =>
          `Email already exists for this type of user account`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.User || mongoose.model("User", User);
