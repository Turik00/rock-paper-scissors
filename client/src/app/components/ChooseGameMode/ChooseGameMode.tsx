import React, { useState } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '../../consts/css-consts';
import { selectSinglePlayer } from '../../store/game-slice';
import { useAppDispatch } from '../../store/hooks';
import CreateMultiplayerModal from '../Multiplayer/CreateMultiplayer/CreateMultiplayer';
import JoinMultiplayer from '../Multiplayer/JoinMultiplayer/JoinMultiplayer';
import useSocket from '../../hooks/useSocket';

export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const GameModeButton = styled(Button)`
  width: 12rem;
`;

const ChooseGameMode = () => {
  const [showCreateMultiplayerModal, setShowCreateMultiplayerModal] = useState<boolean>(false);
  const [showJoinMultiplayerModal, setShowJoinMultiplayerModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {socket, socketStartGame} = useSocket();

  const singlePlayerClickHandler = useCallback(() => {
    dispatch(selectSinglePlayer());
  }, [dispatch]);

  const multiPlayerClickHandler = useCallback(() => {
    if (socket == null) {
      return;
    }
    socket.emit('joinRandomPlayer');
    socketStartGame();
  }, [socket, socketStartGame]);

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
      {showJoinMultiplayerModal ? <JoinMultiplayer setShowModalHandler={setShowJoinMultiplayerModal} /> : null}
    </React.Fragment>
  );
};

export default ChooseGameMode;

