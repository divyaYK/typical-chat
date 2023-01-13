import styled from "styled-components";

export const StyledChatWindow = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.COLORS.DARK.BACKGROUND_03};
  padding: 1.5rem;
`;

export const StyledChatNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100%;
`;

export const StyledChatListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  padding: 1rem 0;
`;

export const StyledChatList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  list-style: none;
  height: 100%;
  overflow: auto;
`;

export const StyledChatListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80px;
`;

export const StyledChatLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
`;

export const StyledChatAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledChatDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  height: 100%;
  padding: 0.5rem 0;
  margin-left: 0.5rem;
  justify-content: space-between;

  & p {
    color: ${({ theme }) => theme.COLORS.LIGHT.BACKGROUND_03};
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
`;

export const StyledChatRoom = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 1rem;
  overflow: hidden;
  border-radius: 1rem;
`;

export const StyledChatRoomHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.COLORS.DARK.BACKGROUND_01};
  padding: 1.5rem;
`;

export const StyledChatRoomBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.DARK.BACKGROUND_02};
  padding: 1.5rem;

  & > div {
    background-color: ${({ theme }) => theme.COLORS.DARK.BACKGROUND_03};
    border-radius: 0.5rem;
    height: 70px;
  }
`;

export const StyledChatRoomDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
`;

export const StyledChatRoomDetailsHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0.8rem;
  border-bottom: 2px solid ${({ theme }) => theme.COLORS.DARK.BACKGROUND_01};

  & svg {
    color: white;
    width: 1.5rem;
    margin-right: 0.8rem;
  }
`;

export const StyledChatRoomDetailsBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1.5rem 1rem;
`;
