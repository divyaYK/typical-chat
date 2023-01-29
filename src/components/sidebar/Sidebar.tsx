import useMode from "../../hooks/useMode";
import { Avatar } from "../avatar/Avatar";
import { Icon } from "../icon/Icon";
import {
  StyledSidebar,
  StyledSidebarActions,
  StyledSidebarFooter,
} from "./SidebarStyles";

const Sidebar = () => {
  const { mode } = useMode();
  return (
    <StyledSidebar mode={mode}>
      <StyledSidebarActions mode={mode}>
        <Icon icon="ChatRightText" inherit />
        <Icon icon="Pin" inherit />
        <Icon icon="People" inherit />
        <Icon icon="Trash" inherit />
      </StyledSidebarActions>
      <StyledSidebarFooter>
        <Avatar />
      </StyledSidebarFooter>
    </StyledSidebar>
  );
};

export default Sidebar;
