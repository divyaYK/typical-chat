import { forwardRef, ComponentPropsWithoutRef } from "react";
import { StyledInputRightAddOn } from "./InputStyles";
import useMode from "../../hooks/useMode";

const InputRightAddOn = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, ...props }, ref) => {
  const { mode } = useMode();
  return (
    <StyledInputRightAddOn mode={mode} ref={ref} {...props}>
      {children}
    </StyledInputRightAddOn>
  );
});

export default InputRightAddOn;
