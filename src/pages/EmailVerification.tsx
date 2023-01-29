/* eslint-disable no-unused-vars */
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { VERIFY_EMAIL } from "../graphql/queries/authQueries";
import ErrorComponent from "../components/error/Error";
import { IMode } from "../utils/types";
import { ThemeEnum } from "../theme";
import { Text } from "../components/typography/Text";
import useMode from "../hooks/useMode";

const PageWrapper = styled.section<IMode>`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background-color: ${({ theme, mode }) => (mode === ThemeEnum.DARK
    ? theme.COLORS.DARK.BACKGROUND_01
    : theme.COLORS.LIGHT.BACKGROUND_01)};

  & h1,
  & p {
    margin: 0.5rem 1rem;
  }
`;

const StyledGif = styled.img`
  width: 300px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const ActionButton = styled(Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.EMERALD_GREEN};
  color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
`;

const enum VerificationStatus {
  SUCCESS = "SUCCESS",
  NOT_FOUND = "NOT_FOUND",
  LINK_EXPIRED = "LINK_EXPIRED",
  SERVER_ERROR = "SERVER_ERROR",
  ALREADY_VERIFIED = "ALREADY_VERIFIED",
}

const EmailVerification = () => {
  const { mode } = useMode();
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams();
  const { loading, error, data } = useQuery(VERIFY_EMAIL, {
    variables: {
      email: searchParams.get("email"),
      tk: searchParams.get("tk"),
    },
  });

  if (loading) {
    return <div className="">Loading</div>;
  }
  if (error) {
    return <ErrorComponent />;
  }
  if (data.verifyEmail.status === VerificationStatus.SUCCESS) {
    return (
      <PageWrapper mode={mode}>
        <StyledGif
          src="https://media1.giphy.com/media/sVnKj2wDhUTsFKFWhx/giphy.gif?cid=ecf05e47yhh883ezv4cdeogroa55un0nk4y4lbrx03qny1by&rid=giphy.gif&ct=g"
          alt="email verified successfully"
        />
        <Text as="h1" variant="h2">
          Verification Successful! 🎉
        </Text>
        <Text variant="h4">
          Your email
          {' '}
          {searchParams.get("email")}
          {' '}
          verified successfully.
          {' '}
          <br />
          {" "}
          You can login now.
          {" "}
        </Text>
        <ActionButton to="/login">Login here!</ActionButton>
      </PageWrapper>
    );
  }
  if (data.verifyEmail.status === VerificationStatus.LINK_EXPIRED) {
    return (
      <PageWrapper mode={mode}>
        <StyledGif
          src="https://media2.giphy.com/media/80TEu4wOBdPLG/giphy.gif?cid=ecf05e47bnm0zcf26zere8eaf5cn8wj5pil7widl4m8x1pv2&rid=giphy.gif&ct=g"
          alt="oops, link expired"
        />
        <Text as="h1" variant="h2">
          Oops!
        </Text>
        <Text variant="h4">This link expired. 😕</Text>
        <ActionButton as="button">Resend Link</ActionButton>
      </PageWrapper>
    );
  }
  if (data.verifyEmail.status === VerificationStatus.NOT_FOUND) {
    return (
      <PageWrapper mode={mode}>
        <StyledGif
          src="https://media2.giphy.com/media/ANbD1CCdA3iI8/giphy.gif?cid=ecf05e479hnuo08vcydjmczyfvacyeobkyqeu6wks3hv181w&rid=giphy.gif&ct=g"
          alt="user not found"
        />
        <Text as="h1" variant="h2">
          Hmm... 🤔
        </Text>
        <Text variant="h4">
          User(
          {searchParams.get("email")}
          ) does not exist.
          {' '}
          <br />
          {' '}
          Please sign up to
          verify your email.
        </Text>
        <ActionButton to="/sign-up">Sign up here</ActionButton>
      </PageWrapper>
    );
  }
  if (data.verifyEmail.status === VerificationStatus.SERVER_ERROR) {
    return (
      <PageWrapper mode={mode}>
        <StyledGif
          src="https://media1.giphy.com/media/3oKIPlpftSI37ei5QA/giphy.gif?cid=ecf05e47wmycxfm60x4mpivkmsodxzia3j7rlikk5xn3667e&rid=giphy.gif&ct=g"
          alt="some error occurred"
        />
        <Text as="h1" variant="h2">
          Hmm... 🤔
        </Text>
        <Text variant="h4">
          Looks like something went wrong... Please try again later.
        </Text>
        <ActionButton to="/">Go to home page</ActionButton>
      </PageWrapper>
    );
  }
  if (data.verifyEmail.status === VerificationStatus.ALREADY_VERIFIED) {
    return (
      <PageWrapper mode={mode}>
        <StyledGif
          src="https://media2.giphy.com/media/aPZn7M4ZEyHTmLXjJt/giphy.gif?cid=ecf05e47uigy2tpxap0uigmma42m2xxldwnl6y939fks4gyr&rid=giphy.gif&ct=g"
          alt="email already verified"
        />
        <Text as="h1" variant="h2">
          Effort appreciated! 🤗
        </Text>
        <Text variant="h4">...but your email is already verified.</Text>
        <ActionButton to="/login">Login here</ActionButton>
      </PageWrapper>
    );
  }
  return <ErrorComponent />;
};

export default EmailVerification;
