import React from 'react';
import { createGlobalStyle } from 'styled-components';
import GameArea from './components/GameArea/GameArea';
import { defaultColor } from './consts/css-consts';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Barlow Semi Condensed', sans-serif;
    @media screen and (min-width: 1366px) {
      font-size: 16px;
    }
    @media screen and (min-width: 900px) and (max-width: 1365px) {
      font-size: 14px;
    }
    @media screen and (min-width: 500px) and (max-width: 899px) {
      font-size: 12px;
    }
    @media screen and (max-width: 499px) {
      font-size: 10px;
    }
    @media screen and (max-width: 375px) {
      font-size: 8px;
    }
  }
  body {
    background: radial-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%));
    color: ${defaultColor};
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
  }
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <GameArea />
    </React.Fragment>
  );
}

export default App;
