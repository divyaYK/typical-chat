import { ThemeEnum } from "../../theme";
import Search from "../search/Search";
import { Text } from "../typography/Text";
import ChatDetails from "./ChatDetails";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import { StyledChatNavbar, StyledChatWindow } from "./ChatStyles";

const ChatWindow = () => (
  <StyledChatWindow>
    <StyledChatNavbar>
      <Text as="h1" variant="h4" mode={ThemeEnum.DARK}>
        Space Name
      </Text>
      <Search />
      <ChatList />
    </StyledChatNavbar>
    <ChatRoom />
    <ChatDetails />
  </StyledChatWindow>
);

export default ChatWindow;
