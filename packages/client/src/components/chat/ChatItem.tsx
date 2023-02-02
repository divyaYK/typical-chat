import useMode from "../../hooks/useMode";
import { Avatar } from "../avatar/Avatar";
import { Text } from "../typography/Text";
import {
  StyledChatAvatar,
  StyledChatDetails,
  StyledChatLink,
  StyledChatListItem,
} from "./ChatStyles";

const ChatItem = () => {
  const { mode } = useMode();
  return (
    <StyledChatListItem>
      <StyledChatLink>
        <StyledChatAvatar>
          <Avatar />
        </StyledChatAvatar>
        <StyledChatDetails mode={mode}>
          <Text as="h6" fontWeight="500" fontSize="1.2rem">
            Username
          </Text>
          <Text fontSize="0.9rem">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            magnam consequatur enim corrupti impedit quibusdam repudiandae in
            omnis officiis ab dolor eum nobis doloremque, accusamus quidem. Quo
            soluta accusantium aliquid.
          </Text>
        </StyledChatDetails>
      </StyledChatLink>
    </StyledChatListItem>
  );
};

export default ChatItem;
