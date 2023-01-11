import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";
import { ITextProps, StyledText } from "./TypeStyles";

export interface IText extends ITextProps, ComponentPropsWithoutRef<"p"> {
  as?: ElementType;
}

export const Text = forwardRef<HTMLParagraphElement, IText>(
  ({ children, ...props }, ref) => (
    <StyledText ref={ref} {...props}>
      {children}
    </StyledText>
  ),
);

Text.defaultProps = {
  as: "p",
};
