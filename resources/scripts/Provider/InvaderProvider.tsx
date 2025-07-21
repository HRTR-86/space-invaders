import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { useGameStatusContext } from '@/scripts/Provider/GamaStatusProvider';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { EImperative } from '@/scripts/Enum/Imperative';
import { EGameStatus } from '@/scripts/Enum/GameStatus';
import { DEFAULT_INVADER_COUNT } from '@/scripts/Config/Parameter';

interface Coordinate {
  x: number;
  y: number;
}

interface InvaderContext {
  invaderTwoDimensionalList: boolean[][];
  setInvaderTwoDimensionalList: Dispatch<SetStateAction<boolean[][]>>;
  isExist: (x: number, y: number) => boolean;
  handleChangeAttacked: (x: number, y: number) => void;
  destroyedInvaderCount: number;
}

interface IProps extends IPropsBase {}

const InvaderContext = createContext<InvaderContext>({
  invaderTwoDimensionalList: [[]],
  setInvaderTwoDimensionalList: () => {},
  isExist: () => false,
  handleChangeAttacked: () => {},
  destroyedInvaderCount: 0,
});

export const InvaderProvider = ({ children }: IProps) => {
  const { imperative } = useImperativeContext();
  const { setGameStatus } = useGameStatusContext();

  const [invaderTwoDimensionalList, setInvaderTwoDimensionalList] = useState<boolean[][]>([]);
  const [destroyedInvaderCount, setDestroyedInvaderCount] = useState<number>(0);

  /**
   * インベーダーが存在するかどうかを確認する
   */
  const isExist = (x: number, y: number): boolean => {
    return (
      invaderTwoDimensionalList[y][x - 2] ||
      invaderTwoDimensionalList[y][x - 1] ||
      invaderTwoDimensionalList[y][x] ||
      invaderTwoDimensionalList[y][x + 1] ||
      invaderTwoDimensionalList[y][x + 2]
    );
  };

  /**
   * インベーダーがビームに当たった場合の処理
   */
  const handleChangeAttacked = (x: number, y: number): void => {
    setInvaderTwoDimensionalList((currentInvaderList) => {
      const newInvaderList = [...currentInvaderList];
      newInvaderList[y][x - 1] = false;
      newInvaderList[y][x] = false;
      newInvaderList[y][x + 1] = false;

      return newInvaderList;
    });

    setDestroyedInvaderCount((currentCount) => currentCount + 1);
  };

  useEffect(() => {
    if (destroyedInvaderCount === DEFAULT_INVADER_COUNT) {
      // TODO: imperativeを使用する形に修正する
      setGameStatus(EGameStatus.GAME_CLEAR);
    }
  }, [destroyedInvaderCount]);

  useEffect(() => {
    if (imperative.message !== EImperative.BEAM_HIT_INVADER) {
      return;
    }

    const { x, y } = imperative.payload as Coordinate;
    handleChangeAttacked(x, y);
  }, [imperative]);

  return (
    <InvaderContext.Provider
      value={{
        invaderTwoDimensionalList,
        setInvaderTwoDimensionalList,
        isExist,
        handleChangeAttacked,
        destroyedInvaderCount,
      }}
    >
      {children}
    </InvaderContext.Provider>
  );
};

export const useInvaderContext = () => useContext(InvaderContext);
