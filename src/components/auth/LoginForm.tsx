/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik, Field, FieldProps } from "formik";
import { StyledFormInput, StyledFormWrapper } from "./AuthStyles";
import { Button } from "../button/Button";
import { ThemeEnum } from "../../theme";
import { Text } from "../typography/Text";

interface ILogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const initialValues: ILogin = {
    email: "",
    password: "",
  };
  const SubmitHandler = (values: ILogin) => {
    console.log({ values });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={SubmitHandler}>
      {(props) => (
        <StyledFormWrapper>
          <Text as="h2" variant="h4" mode={ThemeEnum.LIGHT}>
            Login
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
          <Button mode={ThemeEnum.LIGHT}>Login</Button>
          <div>
            <p>
              Don&apos;t have an account? <a href="#">Sign up</a>{" "}
            </p>
          </div>
        </StyledFormWrapper>
      )}
    </Formik>
  );
};

export default LoginForm;
