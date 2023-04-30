import { CHANNEL_TYPE } from "interfaces/channel.interface";
import mongoose, { Schema } from "mongoose";

const ChannelSchema = new Schema(
  {
    spaceId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Space",
      index: true,
    },
    channelName: {
      type: String,
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
  },
  { timestamps: true },
);

const ChannelModel = mongoose.model("Channel", ChannelSchema);
export default ChannelModel;
