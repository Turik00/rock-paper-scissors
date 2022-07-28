import React, { useState } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { Button, narrowHeightScreenContentWrapper } from '../../consts/css-consts';
import { selectSinglePlayer } from '../../store/game-slice';
import { useAppDispatch } from '../../store/hooks';
import CreateMultiplayerModal from '../Multiplayer/CreateMultiplayer/CreateMultiplayer';
import JoinMultiplayerModal from '../Multiplayer/JoinMultiplayer/JoinMultiplayer';
import useGameSocket from '../../hooks/useSocket';

export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${narrowHeightScreenContentWrapper}
`;

export const GameModeButton = styled(Button)`
  width: 12rem;
  @media screen and (max-width: 500px) {
    height: 2.5rem;
    font-size: 1.5rem;
    width: 50vw;
  }
`;

const ChooseGameMode = () => {
  const [showCreateMultiplayerModal, setShowCreateMultiplayerModal] = useState<boolean>(false);
  const [showJoinMultiplayerModal, setShowJoinMultiplayerModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [socket, socketHookOperations] = useGameSocket();

  const singlePlayerClickHandler = useCallback(() => {
    dispatch(selectSinglePlayer());
  }, [dispatch]);

  const multiPlayerClickHandler = useCallback(() => {
    if (socket == null) {
      return;
    }
    socket.emit('joinRandomPlayer');
    socketHookOperations.socketStartGame();
  }, [socket, socketHookOperations]);

  return (
    <React.Fragment>
      <Wrapper>
        <GameModeButton onClick={singlePlayerClickHandler}>Single player</GameModeButton>
        <br />
        <GameModeButton onClick={multiPlayerClickHandler}>Play against random player</GameModeButton>
        <br />
        <GameModeButton onClick={() => setShowCreateMultiplayerModal(true)}>Create new multiplayer game</GameModeButton>
        <br />
        <GameModeButton onClick={() => setShowJoinMultiplayerModal(true)}>Join multiplayer game</GameModeButton>
      </Wrapper>
      {showCreateMultiplayerModal ? <CreateMultiplayerModal setShowModalHandler={setShowCreateMultiplayerModal} /> : null}
      {showJoinMultiplayerModal ? <JoinMultiplayerModal setShowModalHandler={setShowJoinMultiplayerModal} /> : null}
    </React.Fragment>
  );
};

export default ChooseGameMode;

