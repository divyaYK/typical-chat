import mongoose, { Schema } from "mongoose";

const ChannelThreadSchema = new Schema(
  {
    channelId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Channel",
    },
  },
  { timestamps: true },
);

const ChannelThreadModel = mongoose.model("ChannelThread", ChannelThreadSchema);
export default ChannelThreadModel;
