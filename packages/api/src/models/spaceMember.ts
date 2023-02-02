import { SpaceMemberType } from "interfaces/space.interface";
import mongoose, { Schema, Types } from "mongoose";

const SpaceMemberSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  spaceId: {
    type: Types.ObjectId,
    required: true,
  },
  userType: {
    type: String,
    enum: SpaceMemberType,
    default: SpaceMemberType.MEMBER,
  },
});

const SpaceMemberModel = mongoose.model("SpaceMember", SpaceMemberSchema);
export default SpaceMemberModel;
