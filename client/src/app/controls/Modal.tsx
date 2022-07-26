import React from 'react';
import styled from 'styled-components';
import { ModalContentWrapper } from '../consts/css-consts';

export const ModalBackgroundWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.6;
  background-color: #000;
`;

export const ModalHeader = styled.div`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  width: 30rem;
`;

export const ModalHeaderText = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
`;

export const CloseButton = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  width: 1.5rem;
  height: 1.5rem;
  background-image: url(/images/icon-close.svg);
  cursor: pointer;
  &: hover, focus {
    border: 2px solid rgba(112, 76, 182, 0.4);
  }
  &: active {
    background-color: rgba(112, 76, 182, 0.2);
  }
`;

const Modal = ({
  headerText,
  setShowModalHandler,
  children,
}: {
  headerText: string;
  setShowModalHandler: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <React.Fragment>
      <ModalBackgroundWrapper onClick={() => setShowModalHandler(false)}></ModalBackgroundWrapper>
      <ModalContentWrapper>
        <ModalHeader>
          <ModalHeaderText>{headerText}</ModalHeaderText>
          <CloseButton onClick={() => setShowModalHandler(false)} />
        </ModalHeader>
        {children}
      </ModalContentWrapper>
    </React.Fragment>
  );
};

export default Modal;
