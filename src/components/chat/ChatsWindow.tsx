import Search from "../search/Search";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import { StyledChatNavbar, StyledChatWindow } from "./ChatStyles";

const ChatWindow = () => (
  <StyledChatWindow>
    <StyledChatNavbar>
      <Search />
      <ChatList />
    </StyledChatNavbar>
    <ChatRoom />
  </StyledChatWindow>
);

export default ChatWindow;
