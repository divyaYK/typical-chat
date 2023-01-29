import { MessageType } from "interfaces/message.interface";
import mongoose, { Schema, Types } from "mongoose";

const MessageSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
    index: true,
  },
  parentId: {
    type: Types.ObjectId,
    required: true,
    index: true,
  },
  parentType: {
    type: String,
    enum: MessageType,
    required: true,
  },
  content: {
    type: String,
    maxLength: [10000, "Message cannot exceed 10000 characters"],
    minLength: [1, "Message cannot be empty"],
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
  deletedAt: {
    type: Date,
    required: true,
    default: null,
  },
});

const spaceModel = mongoose.model("Space", MessageSchema);
export default spaceModel;
