import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import {
  IUserDocument,
  IUserDocumentMethods,
  TUserModel,
} from "interfaces/user.interface";

const UserSchema = new mongoose.Schema<
  IUserDocument,
  TUserModel,
  IUserDocumentMethods
>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Received invalid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: [12, "Password too short"],
    },
    avatar: {
      type: String,
      default: "/user-default.jpg",
    },
    verified: {
      type: Boolean,
      default: false,
      select: false,
    },
    uId: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });

UserSchema.pre("save", async function preSaveHook(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

UserSchema.method(
  "comparePasswords",
  async (passwordToCheck: string, userPassword: string) => {
    const result = await bcrypt.compare(passwordToCheck, userPassword);
    return result;
  }
);

const userModel = mongoose.model("User", UserSchema);
export default userModel;
