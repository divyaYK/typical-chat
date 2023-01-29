import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  StyledErrorMessage,
  StyledForm,
  StyledFormControl,
  StyledFormFooter,
  StyledFormWrapper,
  StyledInlineFormControl,
  StyledPostFormSubmission,
} from "./AuthStyles";
import { Text } from "../typography/Text";
import { Button } from "../button/Button";
import { SignUpSchema } from "./ValidationSchema";
import useMode from "../../hooks/useMode";
import { Input } from "../input/Input";
import StyledLink from "../link/RouterLink";
import InputGroup from "../input/InputGroup";
import InputLeftAddOn from "../input/InputLeftAddOn";
import { Icon } from "../icon/Icon";
import InputRightAddOn from "../input/InputRightAddon";
import { SIGN_UP } from "../../graphql/mutations/authMutations";
import ErrorComponent from "../error/Error";

interface ISignup {
  firstName: string;
  lastName: string | undefined;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const { mode } = useMode();
  const [formSubmitted, setFormSubmitted] = useState(false);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [signup, { data, loading, error }] = useMutation(SIGN_UP);

  // Avatar variables
  // const imageRef = useRef<HTMLImageElement & { file: File }>(null);
  // const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
  //   const fileList = e.target.files;
  //   if (fileList !== null && fileList.length > 0) {
  //     const reader = new FileReader();
  //     const { current } = imageRef;
  //     if (current !== null) {
  //       // eslint-disable-next-line prefer-destructuring
  //       current.file = fileList[0];
  //       reader.onload = (readerEvent) => {
  //         current.src = readerEvent.target?.result as unknown as string;
  //       };
  //     }
  //     reader.readAsDataURL(fileList[0]);
  //   }
  // };

  // password variables
  const [showPassword, setShowPassword] = useState(false);
  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };
  // confirm password variables
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const confirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // form variables
  const initialValues: ISignup = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const SubmitHandler = (values: ISignup) => {
    signup({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          passwordConfirm: values.confirmPassword,
        },
      },
    });
    setFormSubmitted(true);
  };
  const formikInstance = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: SubmitHandler,
  });

  const postSubmitUi = (
    <StyledPostFormSubmission mode={mode}>
      <Text as="h1" variant="h3">
        Sign up successful!
      </Text>
      <Text>
        Please verify your email.
        {' '}
        <br />
        {' '}
        The verification link has been sent to
        your mailbox.
      </Text>
      <Text>Email already verified?</Text>
      <Link to="/login">
        <Button>Login here</Button>
      </Link>
    </StyledPostFormSubmission>
  );
  if (error) return <ErrorComponent />;
  if (loading) return <h1>Loading...</h1>;

  return formSubmitted ? (
    postSubmitUi
  ) : (
    <StyledFormWrapper className="form__wrapper--signup" mode={mode}>
      <Text as="h1" variant="h3">
        Sign Up
      </Text>
      <StyledForm onSubmit={formikInstance.handleSubmit}>
        {/* <StyledFormControl className="form__control__avatar">
          <StyledFormAvatar htmlFor="avatarInput">
            <Input
              id="avatarInput"
              type="file"
              accept="image/*"
              multiple={false}
              placeholder="Upload your avatar"
              aria-required={false}
              aria-label="please upload your avatar"
              autoComplete="off"
              aria-invalid={
                !!formikInstance.errors.avatar && formikInstance.touched.avatar
              }
              {...formikInstance.getFieldProps("avatar")}
              onChange={(e) => {
                handleAvatarUpload(e);
                formikInstance.getFieldProps("avatar").onChange(e);
              }}
            />
            <Avatar ref={imageRef} />
            <StyledFormAvatarIcon>
              <Icon icon="PlusCircle" />
            </StyledFormAvatarIcon>
          </StyledFormAvatar>
          {formikInstance.errors.avatar && formikInstance.touched.avatar && (
            <StyledErrorMessage>
              {formikInstance.errors.avatar}
            </StyledErrorMessage>
          )}
        </StyledFormControl> */}
        <StyledInlineFormControl className="form__control--inline">
          <StyledFormControl>
            <InputGroup
              aria-label="please enter your first name"
              aria-invalid={
                !!formikInstance.errors.firstName
                && formikInstance.touched.firstName
              }
            >
              <InputLeftAddOn aria-label="enter your first name">
                <Icon icon="CursorText" />
              </InputLeftAddOn>
              <Input
                type="text"
                placeholder="Enter your first name"
                className="form__input"
                required
                aria-required
                aria-label="please enter your first name"
                inputMode="text"
                autoComplete="given-name"
                aria-invalid={
                  !!formikInstance.errors.firstName
                  && formikInstance.touched.firstName
                }
                {...formikInstance.getFieldProps("firstName")}
              />
            </InputGroup>
            {formikInstance.errors.firstName
              && formikInstance.touched.firstName && (
                <StyledErrorMessage>
                  {formikInstance.errors.firstName}
                </StyledErrorMessage>
            )}
          </StyledFormControl>
          <StyledFormControl>
            <InputGroup
              aria-label="please enter your last name"
              aria-invalid={
                !!formikInstance.errors.lastName
                && formikInstance.touched.lastName
              }
            >
              <InputLeftAddOn aria-label="enter your last name">
                <Icon icon="CursorText" />
              </InputLeftAddOn>
              <Input
                type="text"
                placeholder="Enter your last name"
                className="form__input"
                required
                aria-required
                aria-label="please enter your last name"
                inputMode="text"
                autoComplete="family-name"
                aria-invalid={
                  !!formikInstance.errors.lastName
                  && formikInstance.touched.lastName
                }
                {...formikInstance.getFieldProps("lastName")}
              />
            </InputGroup>
            {formikInstance.errors.lastName
              && formikInstance.touched.lastName && (
                <StyledErrorMessage>
                  {formikInstance.errors.lastName}
                </StyledErrorMessage>
            )}
          </StyledFormControl>
        </StyledInlineFormControl>

        <StyledFormControl>
          <InputGroup
            aria-label="please enter your email address"
            aria-invalid={
              !!formikInstance.errors.email && formikInstance.touched.email
            }
          >
            <InputLeftAddOn aria-label="enter your email address">
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
          {formikInstance.errors.email && formikInstance.touched.email && (
            <StyledErrorMessage>
              {formikInstance.errors.email}
            </StyledErrorMessage>
          )}
        </StyledFormControl>
        <StyledFormControl>
          <InputGroup
            aria-label="please enter your password"
            aria-invalid={
              !!formikInstance.errors.password
              && formikInstance.touched.password
            }
          >
            <InputLeftAddOn aria-label="enter your password">
              <Icon icon="Lock" />
            </InputLeftAddOn>
            <Input
              placeholder="Enter new password"
              type={showPassword ? "text" : "password"}
              required
              aria-required
              aria-label="please enter your password"
              inputMode="text"
              aria-invalid={
                !!formikInstance.errors.password
                && formikInstance.touched.password
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
          {formikInstance.errors.password
            && formikInstance.touched.password && (
              <StyledErrorMessage>
                {formikInstance.errors.password}
              </StyledErrorMessage>
          )}
        </StyledFormControl>
        <StyledFormControl>
          <InputGroup
            aria-label="please confirm your password"
            aria-invalid={
              !!formikInstance.errors.confirmPassword
              && formikInstance.touched.confirmPassword
            }
          >
            <InputLeftAddOn aria-label="confirm your password">
              <Icon icon="Lock" />
            </InputLeftAddOn>
            <Input
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
              required
              aria-required
              aria-label="please confirm your password"
              inputMode="text"
              aria-invalid={
                !!formikInstance.errors.confirmPassword
                && formikInstance.touched.confirmPassword
              }
              autoComplete="new-password"
              {...formikInstance.getFieldProps("confirmPassword")}
            />
            <InputRightAddOn aria-label="Show password">
              <Button
                className="input__addon__button"
                variant="noStyles"
                onClick={() => confirmPasswordHandler()}
              >
                <Icon icon={showConfirmPassword ? "Eye" : "EyeSlash"} />
              </Button>
            </InputRightAddOn>
          </InputGroup>
          {formikInstance.errors.confirmPassword
            && formikInstance.touched.confirmPassword && (
              <StyledErrorMessage>
                {formikInstance.errors.confirmPassword}
              </StyledErrorMessage>
          )}
        </StyledFormControl>
        <Button type="submit">Sign Up</Button>
      </StyledForm>
      <StyledFormFooter>
        <Text>
          Already have an account?
          <StyledLink to="/login">Login</StyledLink>
        </Text>
      </StyledFormFooter>
    </StyledFormWrapper>
  );
};

export default SignUpForm;
