/* eslint-disable react/default-props-match-prop-types */
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { IIconProps, StyledIcon } from "./IconStyles";
import useMode from "../../hooks/useMode";
import { ICONS } from "../../theme";

export interface IIcon extends ComponentPropsWithoutRef<"div">, IIconProps {
  icon?: keyof typeof ICONS;
}

export const Icon = forwardRef<HTMLDivElement, IIcon>(
  ({ icon, inherit, ...props }, ref) => {
    const { mode } = useMode();
    return (
      <StyledIcon inherit={inherit} mode={mode} ref={ref} {...props}>
        {icon ? ICONS[icon] : ICONS.Question}
      </StyledIcon>
    );
  },
);

Icon.defaultProps = {
  icon: "Question",
};
