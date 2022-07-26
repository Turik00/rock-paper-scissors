import { FormEvent, useRef } from 'react';
import styled from 'styled-components';
import Modal from '../../../controls/Modal';
import useSocket from '../../../hooks/useSocket';

const Form = styled.form`
  color: #000;
  margin: 2rem 2rem 5rem 2rem;
`;

const CreateMultiplayerModal = ({ setShowModalHandler }: { setShowModalHandler: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const {socket, socketStartGame} = useSocket();
  const inputEl = useRef<HTMLInputElement>(null);
  const createUserSubmitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    socket?.emit('registerAsDeterminedPlayer', {playerName: inputEl.current?.value});
    socketStartGame();
    setShowModalHandler(false);
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
    </Modal>
  );
};

export default CreateMultiplayerModal;
