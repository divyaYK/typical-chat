import styled from "styled-components";
import { Helmet } from "react-helmet";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import ChatWindow from "../components/chat/ChatsWindow";

const StyledHomePageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledHomePageContentWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;

const HomePage = () => (
  <StyledHomePageWrapper>
    <Helmet>
      <title>Home | Typical Chat</title>
      <meta
        name="description"
        content="Home page of typical chat application"
      />
    </Helmet>
    <Header />
    <StyledHomePageContentWrapper>
      <Sidebar />
      <ChatWindow />
    </StyledHomePageContentWrapper>
  </StyledHomePageWrapper>
);

export default HomePage;
