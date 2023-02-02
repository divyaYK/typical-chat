import { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "./Icon";

interface IWrapper {
  showingIcon: boolean;
}

const Wrapper = styled.div<IWrapper>`
  display: ${({ showingIcon }) => (showingIcon ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  transition: display 0.4s ease-in;
`;

const FadingIcon = () => {
  const [showingIcon, setShowingIcon] = useState(true);

  useEffect(() => {
    const fourSecondInterval = setInterval(() => {
      setShowingIcon(false);
    }, 4000);

    return () => clearInterval(fourSecondInterval);
  }, []);
  return (
    <Wrapper showingIcon={showingIcon}>
      <Icon icon="Check" />
    </Wrapper>
  );
};

export default FadingIcon;
