import React, { useCallback } from 'react';
import styled from 'styled-components';
import { globalExtended } from '../../../consts/consts';
import { defaultColor } from '../../../consts/css-consts';
import { selectGesture } from '../../../store/game-slice';
import { useAppDispatch } from '../../../store/hooks';
import {Gestures} from '../../../../common/types';
import useGameSocket from '../../../hooks/useSocket';


export interface BasicGestureProps {
  children?: React.ReactNode;
  borderGradient?: string;
  circleDiameter?: number;
  isActive?: boolean;
  gesture?: Gestures;
  isBlank?: boolean;
}

const BlankCircle = styled.div`
  height: ${(props: BasicGestureProps) => props.circleDiameter}rem;
  width: ${(props: BasicGestureProps) => props.circleDiameter}rem;
  border-radius: 50%;
  border: 1rem solid transparent;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)) padding-box,
    linear-gradient(transparent, transparent) border-box;
`;

const Circle = styled(BlankCircle)`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  cursor: ${(props: BasicGestureProps) => (props.isActive ? 'pointer;' : 'auto;')}
  ${(props: BasicGestureProps) =>
    props.isActive &&
    `&:hover {
        transform: scale(1.3);
      }
    `}
  background: linear-gradient(${defaultColor}, ${defaultColor}) padding-box,
    linear-gradient(${(props: BasicGestureProps) => props.borderGradient}) border-box;
`;

export const BgBase = styled.div`
    background-repeat: no-repeat;
    background-size: contain;
    width 50%;
    aspect-ratio: 1/1;
`;

const BasicHandGesture = (props: BasicGestureProps) => {
  const dispatch = useAppDispatch();
  const socketHookOperations = useGameSocket()[1];

  const gestureClickHandler = useCallback(() => {
    if (props.gesture == null || props.isActive === false) {
      return;
    }
    socketHookOperations.socketPlayerMove(props.gesture);
    dispatch(selectGesture(props.gesture));
  }, [props.gesture, props.isActive, dispatch]);

  return (
    <React.Fragment>
      {props.children != null ? (
        <Circle
          borderGradient={props.borderGradient}
          circleDiameter={props.circleDiameter ?? 6}
          isActive={props.isActive ?? true}
          onClick={gestureClickHandler}
        >
          {props.children}
        </Circle>
      ) : (
        <BlankCircle circleDiameter={props.circleDiameter ?? 6}/>
      )}
    </React.Fragment>
  );
};

export default BasicHandGesture;
