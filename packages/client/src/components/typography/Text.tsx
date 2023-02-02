import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";
import { ITextProps, StyledText } from "./TypeStyles";
import useMode from "../../hooks/useMode";

export interface IText extends ITextProps, ComponentPropsWithoutRef<"p"> {
  as?: ElementType;
}

export const Text = forwardRef<HTMLParagraphElement, IText>(
  ({ children, ...props }, ref) => {
    const { mode } = useMode();
    return (
      <StyledText ref={ref} mode={mode} {...props}>
        {children}
      </StyledText>
    );
  },
);

Text.defaultProps = {
  as: "p",
};
