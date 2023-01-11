/* eslint-disable react/default-props-match-prop-types */
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { IIconProps, StyledIcon } from "./IconStyles";
import { ICONS } from "../../theme";

export interface IIcon extends ComponentPropsWithoutRef<"div">, IIconProps {
  icon?: keyof typeof ICONS;
}

export const Icon = forwardRef<HTMLDivElement, IIcon>(
  ({ icon, ...props }, ref) => (
    <StyledIcon ref={ref} {...props}>
      {icon ? ICONS[icon] : ICONS.Question}
    </StyledIcon>
  ),
);

Icon.defaultProps = {
  width: "auto",
  height: "auto",
  color: "inherit",
  icon: "Question",
};
