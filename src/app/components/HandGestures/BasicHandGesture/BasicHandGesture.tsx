import { useCallback } from 'react';
import styled from 'styled-components';
import { defaultColor } from '../../../consts/css-consts';
import { Gestures, selectGesture } from '../../../store/game-slice';
import { useAppDispatch } from '../../../store/hooks';

export interface BasicGestureProps {
  children?: React.ReactNode;
  borderGradient?: string;
  circleDiameter?: number;
  hasHover?: boolean;
  gesture?: Gestures;
}

const Circle = styled.div`
  background-color: ${defaultColor};
  height: ${(props: BasicGestureProps) => props.circleDiameter}rem;
  width: ${(props: BasicGestureProps) => props.circleDiameter}rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  cursor: ${(props: BasicGestureProps) =>
    props.hasHover ? 'pointer;' : 'auto;'}
  ${(props: BasicGestureProps) =>
    props.hasHover &&
    `&:hover {
        transform: scale(1.3);
      }
    `}
  background: linear-gradient(${defaultColor}, ${defaultColor}) padding-box,
    linear-gradient(${(props: BasicGestureProps) => props.borderGradient}) border-box;
  border-radius: 50em;
  border: 0.7rem solid transparent;
`;

export const BgBase = styled.div`
    background-repeat: no-repeat;
    background-size: contain;
    width 50%;
    aspect-ratio: 1/1;
`;

const BasicHandGesture = (props: BasicGestureProps) => {
  const dispatch = useAppDispatch();

  const gestureClickHandler = useCallback(() => {
    if (props.gesture == null) {
      return;
    }
    dispatch(selectGesture(props.gesture));
  }, [props.gesture, dispatch]);

  return (
    <Circle
      borderGradient={props.borderGradient}
      circleDiameter={props.circleDiameter ?? 6}
      hasHover={props.hasHover ?? true}
      onClick={gestureClickHandler}
    >
      {props.children}
    </Circle>
  );
};

export default BasicHandGesture;
