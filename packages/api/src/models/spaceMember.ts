import { SpaceMemberType } from "interfaces/space.interface";
import mongoose from "mongoose";

const SpaceMemberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Space",
  },
  userType: {
    type: String,
    enum: SpaceMemberType,
    default: SpaceMemberType.MEMBER,
  },
});

const SpaceMemberModel = mongoose.model("SpaceMember", SpaceMemberSchema);
export default SpaceMemberModel;
