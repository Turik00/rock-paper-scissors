import styled from 'styled-components';

export interface PieceProps {
  children: React.ReactNode;
  header: string;
}

const PieceWrapper = styled.div`
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

const StandoffPiece = (props: PieceProps) => {
  return (
    <PieceWrapper>
      <Header>{props.header}</Header>
      {props.children}
    </PieceWrapper>
  );
};

export default StandoffPiece;
