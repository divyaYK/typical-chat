import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  StyledErrorMessage,
  StyledForm,
  StyledFormControl,
  StyledFormFooter,
  StyledFormWrapper,
  StyledPostFormSubmission,
  StyledResendActionWrapper,
} from "./AuthStyles";
import { Button } from "../button/Button";
import { Text } from "../typography/Text";
import useMode from "../../hooks/useMode";
import { Input } from "../input/Input";
import StyledLink from "../link/RouterLink";
import { LoginSchema } from "./ValidationSchema";
import InputGroup from "../input/InputGroup";
import InputLeftAddOn from "../input/InputLeftAddOn";
import InputRightAddOn from "../input/InputRightAddon";
import { Icon } from "../icon/Icon";
import {
  LOGIN,
  RESEND_VERIFICATION_LINK,
} from "../../graphql/mutations/authMutations";
import useLocalStorage from "../../hooks/useLocalStorage";
import ErrorComponent from "../error/Error";
import FadingIcon from "../icon/FadingIcon";

interface ILogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { mode } = useMode();
  const navigate = useNavigate();
  const [login, { data: loginData, error: loginError, loading: loginLoading }] =
    useMutation(LOGIN);
  const [
    resendLink,
    {
      data: resendLinkData,
      error: resendLinkError,
      loading: resendLinkLoading,
    },
  ] = useMutation(RESEND_VERIFICATION_LINK);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_, setAccessToken] = useLocalStorage<string | undefined>(
    "access_token",
    undefined,
  );

  // password variables
  const [showPassword, setShowPassword] = useState(false);
  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  // form variables
  const initialValues: ILogin = {
    email: "",
    password: "",
  };
  const SubmitHandler = (values: ILogin) => {
    login({
      variables: {
        input: { ...values },
      },
    });
    if (loginData && loginData.login.message === "SUCCESS") {
      setAccessToken(loginData.login.access_token);
      navigate("/");
    }
  };

  const formikInstance = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: SubmitHandler,
  });

  const resendHandler = () => {
    resendLink({
      variables: {
        input: {
          email: formikInstance.values.email,
        },
      },
    });
  };

  if (loginError || resendLinkError) return <ErrorComponent />;
  if (loginLoading || resendLinkLoading) return <h1>Loading...</h1>;
  if (loginData && loginData.login.message === "NOT_VERIFIED") {
    return (
      <StyledPostFormSubmission mode={mode}>
        <Text as="h1" variant="h3">
          Login Failed!
        </Text>
        <Text>Please verify your email before you login.</Text>
        <Text>Didn&apos;t receive the link?</Text>
        <StyledResendActionWrapper>
          <Button onClick={resendHandler}>Resend Link</Button>
          {resendLinkData?.resendVerificationMail?.status === "SUCCESS" && (
            <FadingIcon />
          )}
        </StyledResendActionWrapper>
      </StyledPostFormSubmission>
    );
  }

  return (
    <StyledFormWrapper className="form__wrapper--login" mode={mode}>
      <Text as="h2" variant="h3">
        Login
      </Text>
      <StyledForm onSubmit={formikInstance.handleSubmit}>
        <StyledFormControl>
          <InputGroup
            aria-label="email input"
            aria-invalid={!!formikInstance.errors.email}
          >
            <InputLeftAddOn aria-label="email icon">
              <Icon icon="MailAt" />
            </InputLeftAddOn>
            <Input
              type="email"
              placeholder="Enter your email address"
              required
              aria-required
              aria-label="please enter your email address"
              inputMode="email"
              autoComplete="email"
              aria-invalid={
                !!formikInstance.errors.email && formikInstance.touched.email
              }
              {...formikInstance.getFieldProps("email")}
            />
          </InputGroup>
          {formikInstance.touched.email && formikInstance.errors.email && (
            <StyledErrorMessage>
              {formikInstance.errors.email}
            </StyledErrorMessage>
          )}
        </StyledFormControl>
        <StyledFormControl>
          <InputGroup
            aria-label="enter your password"
            aria-invalid={
              !!formikInstance.errors.password &&
              formikInstance.touched.password
            }
          >
            <InputLeftAddOn aria-label="password">
              <Icon icon="Lock" />
            </InputLeftAddOn>
            <Input
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              required
              aria-required
              aria-label="please enter your password"
              inputMode="text"
              aria-invalid={
                !!formikInstance.errors.password &&
                formikInstance.touched.password
              }
              autoComplete="current-password"
              {...formikInstance.getFieldProps("password")}
            />
            <InputRightAddOn aria-label="show password">
              <Button
                className="input__addon__button"
                variant="noStyles"
                onClick={() => passwordHandler()}
              >
                <Icon icon={showPassword ? "Eye" : "EyeSlash"} />
              </Button>
            </InputRightAddOn>
          </InputGroup>
          {formikInstance.touched.password &&
            formikInstance.errors.password && (
              <StyledErrorMessage>
                {formikInstance.errors.password}
              </StyledErrorMessage>
          )}
        </StyledFormControl>
        <Button type="submit">Login</Button>
      </StyledForm>
      <StyledFormFooter>
        <Text>
          Don&apos;t have an account?
          <StyledLink to="/sign-up">Sign Up</StyledLink>
        </Text>
      </StyledFormFooter>
    </StyledFormWrapper>
  );
};

export default LoginForm;
