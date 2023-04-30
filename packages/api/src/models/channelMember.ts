import mongoose, { Schema } from "mongoose";

const ChannelMemberSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  channelId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Channel",
  },
});

const ChannelMemberModel = mongoose.model("ChannelMember", ChannelMemberSchema);
export default ChannelMemberModel;
