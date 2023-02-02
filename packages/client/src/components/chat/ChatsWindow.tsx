import useMode from "../../hooks/useMode";
import Search from "../search/Search";
import { Text } from "../typography/Text";
import ChatDetails from "./ChatDetails";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import {
  StyledChatNavbar,
  StyledChatNavbarHeader,
  StyledChatWindow,
} from "./ChatStyles";

const ChatWindow = () => {
  const { mode } = useMode();

  return (
    <StyledChatWindow mode={mode}>
      <StyledChatNavbar>
        <StyledChatNavbarHeader>
          <Text as="h1" variant="h4">
            Space Name
          </Text>
        </StyledChatNavbarHeader>
        <Search />
        <ChatList />
      </StyledChatNavbar>
      <ChatRoom />
      <ChatDetails />
    </StyledChatWindow>
  );
};

export default ChatWindow;
