import { ISignUpInput } from "interfaces/auth.interface";
import userModel from "models/user";

export const checkIfUserExists = async (email: string): Promise<boolean> => {
  const user = await userModel.findOne({ email });
  if (user) return true;
  return false;
};

export const createUser = async (data: ISignUpInput): Promise<void> => {
  await userModel.create(data);
};
