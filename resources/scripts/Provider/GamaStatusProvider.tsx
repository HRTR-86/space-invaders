import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { EGameStatus, TGameStatus } from '@/scripts/Enum/GameStatus';

interface GameStatusContext {
  gameStatus: TGameStatus;
  setGameStatus: Dispatch<SetStateAction<TGameStatus>>;
}

interface IProps extends IPropsBase {}

const GameStatusContext = createContext<GameStatusContext>({
  gameStatus: EGameStatus.DEFAULT,
  setGameStatus: () => {},
});

export const GameStatusProvider = ({ children }: IProps) => {
  const [gameStatus, setGameStatus] = useState<TGameStatus>(EGameStatus.DEFAULT);

  return (
    <GameStatusContext.Provider value={{ gameStatus, setGameStatus }}>
      {children}
    </GameStatusContext.Provider>
  );
};

export const useGameStatusContext = () => useContext(GameStatusContext);
