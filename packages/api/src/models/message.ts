import { MessageType } from "interfaces/message.interface";
import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
    oneOnOneId: {
      type: Schema.Types.ObjectId,
      ref: "OneOnOne",
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
    deletedAt: {
      type: Date,
      required: true,
      default: null,
    },
  },
  { timestamps: true },
);

const messageModel = mongoose.model("Space", MessageSchema);
export default messageModel;
