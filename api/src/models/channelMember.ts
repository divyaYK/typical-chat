import mongoose, { Schema, Types } from "mongoose";

const ChannelMemberSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  channelId: {
    type: Types.ObjectId,
    required: true,
  },
});

const ChannelMemberModel = mongoose.model("ChannelMember", ChannelMemberSchema);
export default ChannelMemberModel;
