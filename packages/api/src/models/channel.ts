import { CHANNEL_TYPE } from "interfaces/channel.interface";
import mongoose, { Schema, Types } from "mongoose";

const ChannelSchema = new Schema({
  spaceId: {
    type: Types.ObjectId,
    required: true,
    index: true,
  },
  channelName: {
    type: String,
    index: true,
  },
  channelDescription: {
    type: String,
    maxLength: [200, "Channel Description cannot exceed 200 characters"],
  },
  channelType: {
    type: String,
    enum: CHANNEL_TYPE,
    required: true,
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

const ChannelModel = mongoose.model("Channel", ChannelSchema);
export default ChannelModel;
