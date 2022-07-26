import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import Modal from '../../../controls/Modal';
import useSocket from '../../../hooks/useSocket';

const JoinMultiplayer = ({ setShowModalHandler }: { setShowModalHandler: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [waitingPlayers, setWaitingPlayers] = useState<string[]>([]);
  const {socket, socketStartGame} = useSocket();
  useEffect(() => {
    socket?.emit('getAllWaitingDeterminedPlayers');
    socket?.on('waitingPlayers', (msg) =>setWaitingPlayers(msg.waitingPlayers));
  }, [socket]);
  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, playerName: string) => {
    socket?.emit('joinDeterminedPlayer', {playerName});
    socketStartGame();
    setShowModalHandler(false);
  };
  return (
    <Modal headerText="Select a player to play against" setShowModalHandler={setShowModalHandler}>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', color: '#000', overflow: 'auto', height: '25rem' }}>
        <List component="nav">
          {waitingPlayers.map((player, index) => {
            return (
              <ListItemButton key={index.toString()} onClick={(event) => handleListItemClick(event, player)}>
                <ListItemText primary={player} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Modal>
  );
};

export default JoinMultiplayer;
