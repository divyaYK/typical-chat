import useMode from "../../hooks/useMode";
import { IStyledSkeletonProps, StyledSkeletonCircle } from "./SkeletonStyles";

const SkeletonCircle = (props: IStyledSkeletonProps) => {
  const { mode } = useMode();
  return <StyledSkeletonCircle mode={mode} {...props} />;
};

export default SkeletonCircle;
