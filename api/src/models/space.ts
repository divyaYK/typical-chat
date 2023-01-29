import mongoose, { Schema, Types } from "mongoose";

const SpaceSchema = new Schema({
  adminId: {
    type: Types.ObjectId,
    required: true,
    index: true,
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
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const spaceModel = mongoose.model("Space", SpaceSchema);
export default spaceModel;
