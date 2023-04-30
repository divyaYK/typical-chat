import validator from "validator";
import { IValidationSchema } from "./validationDecorator";

export const SignUpValidators: IValidationSchema = {
  firstName: [
    {
      validationFunction: validator.isEmpty,
      validateTo: false,
      error: "first name should not be empty",
    },
    {
      validationFunction: validator.isLength,
      options: { min: 2, max: 100 },
      validateTo: true,
      error: "first name should be between 2 to 100 characters",
    },
  ],
  password: [
    {
      validationFunction: validator.isEmpty,
      validateTo: false,
      error: "password should not be empty",
    },
    {
      validationFunction: validator.isLength,
      options: { min: 12, max: undefined },
      validateTo: true,
      error: "password should be between 2 to 100 characters",
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
