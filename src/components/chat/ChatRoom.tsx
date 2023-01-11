import { ThemeEnum } from "../../theme";
import { Input } from "../input/Input";
import { Text } from "../typography/Text";
import {
  StyledChatRoom,
  StyledChatRoomBody,
  StyledChatRoomHeader,
} from "./ChatStyles";

const ChatRoom = () => (
  <StyledChatRoom>
    <StyledChatRoomHeader>
      <Text mode={ThemeEnum.DARK}>Room Name</Text>
      <Text mode={ThemeEnum.DARK}>Details</Text>
    </StyledChatRoomHeader>
    <StyledChatRoomBody>
      <Input
        placeholder="Type a message..."
        className="chat-room--input"
        mode={ThemeEnum.DARK}
        type="text"
      />
    </StyledChatRoomBody>
  </StyledChatRoom>
);

export default ChatRoom;
