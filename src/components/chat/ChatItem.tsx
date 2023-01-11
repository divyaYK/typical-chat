import { ThemeEnum } from "../../theme";
import { Avatar } from "../avatar/Avatar";
import { Text } from "../typography/Text";
import {
  StyledChatAvatar,
  StyledChatDetails,
  StyledChatLink,
  StyledChatListItem,
} from "./ChatStyles";

const ChatItem = () => (
  <StyledChatListItem>
    <StyledChatLink>
      <StyledChatAvatar>
        <Avatar />
      </StyledChatAvatar>
      <StyledChatDetails>
        <Text as="h6" variant="h5" mode={ThemeEnum.DARK}>
          Username
        </Text>
        <Text mode={ThemeEnum.DARK}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          magnam consequatur enim corrupti impedit quibusdam repudiandae in
          omnis officiis ab dolor eum nobis doloremque, accusamus quidem. Quo
          soluta accusantium aliquid.
        </Text>
      </StyledChatDetails>
    </StyledChatLink>
  </StyledChatListItem>
);

export default ChatItem;