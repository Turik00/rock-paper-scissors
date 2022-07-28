import styled, { css } from 'styled-components';

export const defaultColor = '#F8F8FF';
export const defaultBlue = 'hsl(229, 64%, 46%)';

export const narrowHeightScreenContentWrapper = css`
  @media screen and (max-height: 450px) {
    margin-top: 3rem;
  }
`;

export const Button = styled.span`
  outline: hsl(217, 16%, 45%);
  outline-width: 0.15rem;
  outline-style: solid;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  &: hover, focus {
    border: 2px solid rgba(112, 76, 182, 0.4);
  }
  &: active {
    background-color: rgba(112, 76, 182, 0.2);
  }
`;

export const ModalContentWrapper = styled.div`
  background: ${defaultColor};
  height: fit-content;
  max-height: 98vh;
  min-width: 20rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  z-index: 999;
`;
