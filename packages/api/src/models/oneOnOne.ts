import mongoose, { Schema, Types } from "mongoose";

const OneOnOneSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  spaceId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Space",
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const oneOnOneModel = mongoose.model("OneOnOne", OneOnOneSchema);
export default oneOnOneModel;
