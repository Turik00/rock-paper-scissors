import styled from 'styled-components';

export interface PieceProps {
  children: React.ReactNode;
  header: string;
}

const GestureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const Header = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StandoffGesture = (props: PieceProps) => {
  return (
    <GestureWrapper>
      <Header>{props.header}</Header>
      {props.children}
    </GestureWrapper>
  );
};

export default StandoffGesture;
