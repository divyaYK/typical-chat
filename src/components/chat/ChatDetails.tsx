import { ThemeEnum } from "../../theme";
import { Avatar } from "../avatar/Avatar";
import { Icon } from "../icon/Icon";
import { Text } from "../typography/Text";
import {
  StyledChatRoomDetails,
  StyledChatRoomDetailsBody,
  StyledChatRoomDetailsHeader,
} from "./ChatStyles";

const ChatDetails = () => (
  <StyledChatRoomDetails>
    <StyledChatRoomDetailsHeader>
      <Icon icon="ArrowLeft" />
      <Text as="h3" variant="h3" mode={ThemeEnum.DARK}>
        User Info
      </Text>
    </StyledChatRoomDetailsHeader>
    <StyledChatRoomDetailsBody>
      <Avatar />
      <Text as="h5" variant="h5" mode={ThemeEnum.DARK}>
        Username
      </Text>
    </StyledChatRoomDetailsBody>
  </StyledChatRoomDetails>
);

export default ChatDetails;
