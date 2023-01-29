import * as Yup from "yup";

// const SUPPORTED_FORMATS: readonly string[] = [
//   "image/jpg",
//   "image/jpeg",
//   "image/gif",
//   "image/png",
// ];

export const SignUpSchema = Yup.object({
  // avatar: Yup.mixed()
  //   .test(
  //     "Size",
  //     "Image is too large",
  //     (value) => value || value.size <= 1080 * 1080,
  //   )
  //   .test(
  //     "fileFormat",
  //     "Unsupported Format",
  //     (value) => value && SUPPORTED_FORMATS.includes(value.type),
  //   ),
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(12, "Password must be at least 12 characters long")
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(12, "Password must be at least 12 characters long")
    .required("Please enter your password"),
});
