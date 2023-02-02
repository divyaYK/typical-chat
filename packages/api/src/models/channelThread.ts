import mongoose, { Schema, Types } from "mongoose";

const ChannelThreadSchema = new Schema({
  channelId: {
    type: Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const ChannelThreadModel = mongoose.model("ChannelThread", ChannelThreadSchema);
export default ChannelThreadModel;
