import mongoose, { Schema, Types } from "mongoose";

const OneOnOneSchema = new Schema({
  senderId: {
    type: Types.ObjectId,
    required: true,
  },
  spaceId: {
    type: Types.ObjectId,
    required: true,
  },
  recipientId: {
    type: Types.ObjectId,
    required: true,
  },
});

const oneOnOneModel = mongoose.model("OneOnOne", OneOnOneSchema);
export default oneOnOneModel;
