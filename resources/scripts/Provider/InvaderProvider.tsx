import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { useGameStatusContext } from '@/scripts/Provider/GamaStatusProvider';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { EImperative } from '@/scripts/Enum/Imperative';
import { EInvaderType, TInvaderType } from '@/scripts/Enum/InvaderType';
import { DEFAULT_INVADER_COUNT } from '@/scripts/Config/Parameter';

interface Coordinate {
  x: number;
  y: number;
}

interface InvaderContext {
  invaderTwoDimensionalList: TInvaderType[][];
  setInvaderTwoDimensionalList: Dispatch<SetStateAction<TInvaderType[][]>>;
  getExistInvaderType: (x: number, y: number) => TInvaderType;
  handleChangeAttacked: (x: number, y: number) => void;
  destroyedInvaderCount: number;
}

interface IProps extends IPropsBase {}

const InvaderContext = createContext<InvaderContext>({
  invaderTwoDimensionalList: [[]],
  setInvaderTwoDimensionalList: () => {},
  getExistInvaderType: () => EInvaderType.DEFAULT,
  handleChangeAttacked: () => {},
  destroyedInvaderCount: 0,
});

export const InvaderProvider = ({ children }: IProps) => {
  const { imperativeList, handleAddImperative } = useImperativeContext();
  const { handleAddScore } = useGameStatusContext();

  const [invaderTwoDimensionalList, setInvaderTwoDimensionalList] = useState<TInvaderType[][]>([]);
  const [destroyedInvaderCount, setDestroyedInvaderCount] = useState<number>(0);

  /**
   * インベーダーが存在するかどうかを確認する
   */
  const getExistInvaderType = (x: number, y: number): TInvaderType => {
    let index = -2;
    while (index <= 2) {
      const invaderType = invaderTwoDimensionalList[y][x + index];
      if (invaderType === EInvaderType.OCTOPUS) {
        return EInvaderType.OCTOPUS;
      }

      if (invaderType === EInvaderType.CRAB) {
        return EInvaderType.CRAB;
      }

      index++;
    }

    return EInvaderType.DEFAULT;
  };

  /**
   * インベーダーのタイプを更新する
   */
  const updateInvaderType = (currentInvaderType: TInvaderType): TInvaderType => {
    if (currentInvaderType === EInvaderType.CRAB) {
      return EInvaderType.CRAB_DESTROYED;
    }

    if (currentInvaderType === EInvaderType.OCTOPUS) {
      return EInvaderType.OCTOPUS_DESTROYED;
    }

    return currentInvaderType;
  };

  /**
   * インベーダーがビームに当たった場合の処理
   */
  const handleChangeAttacked = (x: number, y: number): void => {
    setInvaderTwoDimensionalList((currentInvaderList) => {
      const newInvaderList = [...currentInvaderList];
      newInvaderList[y][x - 2] = updateInvaderType(newInvaderList[y][x - 2]);
      newInvaderList[y][x - 1] = updateInvaderType(newInvaderList[y][x - 1]);
      newInvaderList[y][x] = updateInvaderType(newInvaderList[y][x]);
      newInvaderList[y][x + 1] = updateInvaderType(newInvaderList[y][x + 1]);
      newInvaderList[y][x + 2] = updateInvaderType(newInvaderList[y][x + 2]);

      return newInvaderList;
    });

    setDestroyedInvaderCount((currentCount) => currentCount + 1);
  };

  useEffect(() => {
    if (destroyedInvaderCount === DEFAULT_INVADER_COUNT) {
      handleAddImperative({
        message: EImperative.ALL_INVADER_DESTROYED,
      });
    }
  }, [destroyedInvaderCount]);

  useEffect(() => {
    const lastImperative = imperativeList.at(-1);
    if (lastImperative === undefined) {
      return;
    }

    if (lastImperative.message === EImperative.BEAM_HIT_INVADER) {
      const { coordinate, invaderType } = lastImperative.payload as {
        coordinate: Coordinate;
        invaderType: TInvaderType;
      };

      handleChangeAttacked(coordinate.x, coordinate.y);
      handleAddScore(invaderType);
    }
  }, [imperativeList]);

  return (
    <InvaderContext.Provider
      value={{
        invaderTwoDimensionalList,
        setInvaderTwoDimensionalList,
        getExistInvaderType,
        handleChangeAttacked,
        destroyedInvaderCount,
      }}
    >
      {children}
    </InvaderContext.Provider>
  );
};

export const useInvaderContext = () => useContext(InvaderContext);
