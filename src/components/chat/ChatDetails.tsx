import useMode from "../../hooks/useMode";
import { Avatar } from "../avatar/Avatar";
import { Icon } from "../icon/Icon";
import { Text } from "../typography/Text";
import {
  StyledChatRoomDetails,
  StyledChatRoomDetailsBody,
  StyledChatRoomDetailsHeader,
} from "./ChatStyles";

const ChatDetails = () => {
  const { mode } = useMode();
  return (
    <StyledChatRoomDetails>
      <StyledChatRoomDetailsHeader mode={mode}>
        <Icon icon="ArrowLeft" />
        <Text as="h3" variant="h3">
          User Info
        </Text>
      </StyledChatRoomDetailsHeader>
      <StyledChatRoomDetailsBody>
        <Avatar />
        <Text as="h5" variant="h5">
          Username
        </Text>
      </StyledChatRoomDetailsBody>
    </StyledChatRoomDetails>
  );
};

export default ChatDetails;
