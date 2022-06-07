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
`;

const TextAreat = styled.p`
  margin: 0;
`;

const Header = () => {
  return (
    <Wrapper>
      <TextAreat>
        ROCK
        <br />
        PAPER
        <br />
        SCISSORS
      </TextAreat>
      <Score />
    </Wrapper>
  );
};

export default Header;
