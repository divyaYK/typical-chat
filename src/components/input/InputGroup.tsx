import { forwardRef, ComponentPropsWithoutRef } from "react";
import { StyledInputGroup } from "./InputStyles";
import useMode from "../../hooks/useMode";

const InputGroup = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ children, ...props }, ref) => {
    const { mode } = useMode();
    return (
      <StyledInputGroup mode={mode} ref={ref} {...props}>
        {children}
      </StyledInputGroup>
    );
  },
);

export default InputGroup;
