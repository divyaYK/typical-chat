import useMode from "../../hooks/useMode";
import { Input } from "../input/Input";
import { Text } from "../typography/Text";
import {
  StyledChatRoom,
  StyledChatRoomBody,
  StyledChatRoomHeader,
} from "./ChatStyles";

const ChatRoom = () => {
  const { mode } = useMode();

  return (
    <StyledChatRoom>
      <StyledChatRoomHeader mode={mode}>
        <Text>Room Name</Text>
        <Text>Details</Text>
      </StyledChatRoomHeader>
      <StyledChatRoomBody mode={mode}>
        <Input
          placeholder="Type a message..."
          className="chat-room--input"
          type="text"
        />
      </StyledChatRoomBody>
    </StyledChatRoom>
  );
};

export default ChatRoom;
