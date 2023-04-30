import { SpaceVisibility } from "interfaces/space.interface";
import mongoose, { Schema } from "mongoose";

const SpaceSchema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    spaceName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    spaceDescription: {
      type: String,
      maxLength: [200, "Description cannot exceed 200 characters"],
    },
    visibility: {
      type: String,
      enum: SpaceVisibility,
      default: SpaceVisibility.PRIVATE,
    },
  },
  { timestamps: true },
);

const spaceModel = mongoose.model("Space", SpaceSchema);
export default spaceModel;
