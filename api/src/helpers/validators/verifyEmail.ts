import validator from "validator";
import { IValidationSchema } from "./validationDecorator";

export const VerifyEmailValidators: IValidationSchema = {
  tk: [
    {
      validationFunction: validator.isEmpty,
      validateTo: false,
      error: "No token provided",
    },
  ],
  email: [
    {
      validationFunction: validator.isEmpty,
      validateTo: false,
      error: "email should not be empty",
    },
    {
      validationFunction: validator.isEmail,
      validateTo: true,
      error: "invalid email address",
    },
  ],
};
