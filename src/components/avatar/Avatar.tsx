import { ComponentPropsWithoutRef, forwardRef } from "react";
import {
  IAvatarProps,
  StyledAvatar,
  StyledAvatarStatus,
  StyledAvatarWrapper,
} from "./AvatarStyles";
// eslint-disable-next-line import/no-unresolved, import/no-absolute-path
import FallbackImg from "/user-default.jpg";

export interface IAvatar
  extends ComponentPropsWithoutRef<"img">,
    IAvatarProps {}

export const Avatar = forwardRef<HTMLImageElement, IAvatar>(
  ({
    children, width, height, ...props
  }, ref) => (
    <StyledAvatarWrapper width={width} height={height}>
      <StyledAvatar ref={ref} {...props} />
      {children}
    </StyledAvatarWrapper>
  ),
);

Avatar.defaultProps = {
  src: FallbackImg,
  alt: "User Profile Picture",
};

export const AvatarStatus = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => <StyledAvatarStatus ref={ref} {...props} />);
