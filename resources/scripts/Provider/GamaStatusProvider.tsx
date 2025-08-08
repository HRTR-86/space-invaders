import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { EGameStatus, TGameStatus } from '@/scripts/Enum/GameStatus';
import { EInvaderType, TInvaderType } from '@/scripts/Enum/InvaderType';

interface GameStatusContext {
  gameStatus: TGameStatus;
  setGameStatus: Dispatch<SetStateAction<TGameStatus>>;
  score: number;
  handleAddScore: (invaderType: TInvaderType) => void;
}

interface IProps extends IPropsBase {}

const GameStatusContext = createContext<GameStatusContext>({
  gameStatus: EGameStatus.DEFAULT,
  setGameStatus: () => {},
  score: 0,
  handleAddScore: () => {},
});

export const GameStatusProvider = ({ children }: IProps) => {
  const [gameStatus, setGameStatus] = useState<TGameStatus>(EGameStatus.DEFAULT);
  const [score, setScore] = useState<number>(0);

  /**
   * スコアを更新する
   */
  const handleAddScore = (invaderType: TInvaderType) => {
    setScore((currentScore) => {
      if (invaderType === EInvaderType.UFO) {
        return currentScore + 100;
      }

      if (invaderType === EInvaderType.CRAB) {
        return currentScore + 20;
      }

      return currentScore + 10;
    });
  };

  return (
    <GameStatusContext.Provider value={{ gameStatus, setGameStatus, score, handleAddScore }}>
      {children}
    </GameStatusContext.Provider>
  );
};

export const useGameStatusContext = () => useContext(GameStatusContext);
