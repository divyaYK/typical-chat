import { nanoid } from "nanoid";
import { Text } from "../typography/Text";
import { StyledChatList, StyledChatListWrapper } from "./ChatStyles";
import ChatItem from "./ChatItem";

const emptyArray = new Array(3).fill(0);

const ChatList = () => (
  <StyledChatListWrapper>
    <Text as="h3" variant="h4">
      All Chats
    </Text>
    <StyledChatList>
      {emptyArray.map(() => (
        <ChatItem key={nanoid()} />
      ))}
    </StyledChatList>
  </StyledChatListWrapper>
);

export default ChatList;
