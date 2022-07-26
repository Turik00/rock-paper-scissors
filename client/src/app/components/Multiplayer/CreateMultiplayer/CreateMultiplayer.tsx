import { Alert, Snackbar } from '@mui/material';
import { FormEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../../controls/Modal';
import useSocket from '../../../hooks/useSocket';

const Form = styled.form`
  color: #000;
  margin: 2rem 2rem 5rem 2rem;
`;

const CreateMultiplayerModal = ({ setShowModalHandler }: { setShowModalHandler: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [showError, setShowError] = useState<boolean>(false);
  const {socket, socketStartGame} = useSocket();
  const inputEl = useRef<HTMLInputElement>(null);
  const createUserSubmitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    socket?.emit('registerAsDeterminedPlayer', {playerName: inputEl.current?.value});
    socket?.on('playerAddedToDeterminedPlayers', () => {
      socketStartGame();
      setShowModalHandler(false);
    });
    socket?.on('playerAlreadyExists', () => {
      setShowError(true);
    });
  };

  return (
    <Modal headerText="Create a new multiplayer game" setShowModalHandler={setShowModalHandler}>
      <Form onSubmit={createUserSubmitFormHandler}>
        <fieldset>
          <label>
            <p>Enter a user name:</p>
            <input ref={inputEl} name="name" type="text" />
          </label>
        </fieldset>
        <button type="submit">Create Game</button>
      </Form>
      <Snackbar open={showError} autoHideDuration={3000} onClose={() => setShowError(false)}>
        <Alert severity="error" sx={{ width: '100%' }}>
          User name: <b>{ inputEl.current?.value }</b> already exists!
        </Alert>
      </Snackbar>
    </Modal>
  );
};

export default CreateMultiplayerModal;
