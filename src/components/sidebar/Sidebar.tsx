import { Avatar } from "../avatar/Avatar";
import { Icon } from "../icon/Icon";
import {
  StyledSidebar,
  StyledSidebarActions,
  StyledSidebarFooter,
} from "./SidebarStyles";

const Sidebar = () => (
  <StyledSidebar>
    <StyledSidebarActions>
      <Icon icon="ChatRightText" />
      <Icon icon="Pin" />
      <Icon icon="People" />
      <Icon icon="Trash" />
    </StyledSidebarActions>
    <StyledSidebarFooter>
      <Avatar />
    </StyledSidebarFooter>
  </StyledSidebar>
);

export default Sidebar;
