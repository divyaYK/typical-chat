/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik, Field, FieldProps } from "formik";
import { StyledFormWrapper } from "./AuthStyles";
import { Text } from "../typography/Text";
import { ThemeEnum } from "../../theme";
import { Button } from "../button/Button";

interface ISignup {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const initialValues: ISignup = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const SubmitHandler = (values: ISignup) => {
    console.log({ values });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={SubmitHandler}>
      {(props) => (
        <StyledFormWrapper>
          <Text as="h2" variant="h4" mode={ThemeEnum.LIGHT}>
            Sign Up
          </Text>
          <Field name="email">
            {({ field, form }: FieldProps) => (
              <input placeholder="Enter email" type="email" />
            )}
          </Field>
          <Field name="password">
            {({ field, form }: FieldProps) => (
              <input placeholder="Enter password" type="password" />
            )}
          </Field>
          <Field name="confirmPassword">
            {({ field, form }: FieldProps) => (
              <input placeholder="Confirm password" type="password" />
            )}
          </Field>
          <Button mode={ThemeEnum.LIGHT}>Sign Up</Button>
          <div>
            <p>
              Already have an account? <a href="#">Login</a>{" "}
            </p>
          </div>
        </StyledFormWrapper>
      )}
    </Formik>
  );
};

export default SignUpForm;
