import mongoose, { Types } from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      unique: true,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

const tokenModel = mongoose.model("Token", TokenSchema);
export default tokenModel;
