import styled from 'styled-components';
import Score from '../Score/Score';

const Wrapper = styled.div`
  outline: hsl(217, 16%, 45%);
  outline-width: 0.15rem;
  outline-style: solid;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  @media screen and (max-height: 500px) {
    font-size: 1rem;
  }
`;

const TextArea = styled.p`
  margin: 0;
`;

const Header = () => {
  return (
    <Wrapper>
      <TextArea>
        ROCK
        <br />
        PAPER
        <br />
        SCISSORS
      </TextArea>
      <Score />
    </Wrapper>
  );
};

export default Header;
