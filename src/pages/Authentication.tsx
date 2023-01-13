import styled from "styled-components";
import { ThemeEnum } from "../theme";
import { Text } from "../components/typography/Text";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

const AuthPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.LIGHT.BACKGROUND_01};
`;

const Authentication = () => (
  <AuthPageWrapper>
    <Text as="h1" variant="h3" mode={ThemeEnum.LIGHT}>
      Space Chat
    </Text>
    <SignUpForm />
  </AuthPageWrapper>
);

export default Authentication;
