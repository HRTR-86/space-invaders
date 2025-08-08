import { createContext, useContext, useEffect, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { EGameStatus, TGameStatus } from '@/scripts/Enum/GameStatus';
import { EImperative } from '@/scripts/Enum/Imperative';
import { EInvaderType, TInvaderType } from '@/scripts/Enum/InvaderType';

interface GameStatusContext {
  gameStatus: TGameStatus;
  score: number;
  handleAddScore: (invaderType: TInvaderType, point?: number) => void;
}

interface IProps extends IPropsBase {}

const GameStatusContext = createContext<GameStatusContext>({
  gameStatus: EGameStatus.DEFAULT,
  score: 0,
  handleAddScore: () => {},
});

export const GameStatusProvider = ({ children }: IProps) => {
  const { imperativeList } = useImperativeContext();

  const [gameStatus, setGameStatus] = useState<TGameStatus>(EGameStatus.DEFAULT);
  const [score, setScore] = useState<number>(0);

  /**
   * スコアを更新する
   */
  const handleAddScore = (invaderType: TInvaderType, point: number = 0) => {
    setScore((currentScore) => {
      if (invaderType === EInvaderType.UFO) {
        return currentScore + point;
      }

      if (invaderType === EInvaderType.CRAB) {
        return currentScore + 20;
      }

      if (invaderType === EInvaderType.OCTOPUS) {
        return currentScore + 10;
      }

      return currentScore;
    });
  };

  useEffect(() => {
    const lastImperative = imperativeList.at(-1);
    if (lastImperative === undefined) {
      return;
    }

    if (lastImperative.message === EImperative.INITIALIZE_SETTINGS) {
      setGameStatus(EGameStatus.PLAYING);
    }

    if (lastImperative.message === EImperative.ALL_INVADER_DESTROYED) {
      setGameStatus(EGameStatus.GAME_CLEAR);
    }

    if (
      lastImperative.message === EImperative.ALL_BATTERY_DESTROYED ||
      lastImperative.message === EImperative.INVADER_REACHED_EDGE
    ) {
      setGameStatus(EGameStatus.GAME_OVER);
    }
  }, [imperativeList]);

  return (
    <GameStatusContext.Provider value={{ gameStatus, score, handleAddScore }}>
      {children}
    </GameStatusContext.Provider>
  );
};

export const useGameStatusContext = () => useContext(GameStatusContext);
