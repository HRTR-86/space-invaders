import { useEffect, useRef } from 'react';
import { IPropsBase, sleep } from '@/scripts/Common/System';
import { useGameStatusContext } from '@/scripts/Provider/GamaStatusProvider';
import { useInvaderContext } from '@/scripts/Provider/InvaderProvider';
import { Invader } from '@/scripts/Pages/Game/Invader';
import { EDirection, TDirection } from '@/scripts/Enum/Direction';
import { EGameStatus } from '@/scripts/Enum/GameStatus';
import { EInvaderType, TInvaderType } from '@/scripts/Enum/InvaderType';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DEFAULT_INVADER_COLUMN_LIST,
  DEFAULT_INVADER_COUNT,
  DEFAULT_OCTOPUS_INVADER_ROW_LIST,
  MAX_MOVE_COUNT,
  INVADER_SLEEP_TIME,
  DEFAULT_CRAB_INVADER_ROW_LIST,
} from '@/scripts/Config/Parameter';

interface IProps extends IPropsBase {}

export const Coordinate = (_: IProps) => {
  const { setGameStatus } = useGameStatusContext();
  const { invaderTwoDimensionalList, setInvaderTwoDimensionalList, destroyedInvaderCount } =
    useInvaderContext();

  const sleepTimeRef = useRef<number>(INVADER_SLEEP_TIME);
  const directionRef = useRef<TDirection>(EDirection.RIGHT);
  const movedCountRef = useRef<number>(0);

  /**
   * インベーダーの一覧を初期化する
   */
  const handeInitialInvaderList = () => {
    setInvaderTwoDimensionalList(
      Array.from({ length: BOARD_HEIGHT }, (_, yCoordinate): TInvaderType[] => {
        return Array.from({ length: BOARD_WIDTH }, (_, xCoordinate): TInvaderType => {
          if (!DEFAULT_INVADER_COLUMN_LIST.includes(xCoordinate)) {
            return EInvaderType.DEFAULT;
          }

          if (DEFAULT_OCTOPUS_INVADER_ROW_LIST.includes(yCoordinate)) {
            return EInvaderType.OCTOPUS;
          }

          if (DEFAULT_CRAB_INVADER_ROW_LIST.includes(yCoordinate)) {
            return EInvaderType.CRAB;
          }

          return EInvaderType.DEFAULT;
        });
      }),
    );
  };

  /**
   * インベーダーが端に到達したかどうかを確認する
   */
  const isAtEdge = (yCoordinate: number): boolean => {
    return yCoordinate === BOARD_HEIGHT - 1;
  };

  /**
   * 移動後のインベーダーの種類を取得する
   */
  const getNextInvaderType = (currentInvaderType: TInvaderType): TInvaderType => {
    if (
      currentInvaderType === EInvaderType.OCTOPUS_DESTROYED ||
      currentInvaderType === EInvaderType.CRAB_DESTROYED
    ) {
      return EInvaderType.DEFAULT;
    }

    return currentInvaderType;
  };

  /**
   * インベーダーを右に移動する
   */
  const moveInvaderToRight = (
    targetInvaderList: TInvaderType[][],
    xCoordinate: number,
    yCoordinate: number,
    movedCount: number,
  ): TInvaderType => {
    // インベーダーが右端に到達した場合は段を下げる
    if (movedCount > MAX_MOVE_COUNT) {
      const currentInvaderType =
        yCoordinate - 1 < 0
          ? EInvaderType.DEFAULT
          : getNextInvaderType(targetInvaderList[yCoordinate - 1][xCoordinate]);
      if (currentInvaderType && isAtEdge(yCoordinate)) {
        // TODO: imperativeを使用する形に修正する
        setGameStatus(EGameStatus.GAME_OVER);
      }

      return getNextInvaderType(currentInvaderType);
    }

    return xCoordinate - 1 < 0
      ? EInvaderType.DEFAULT
      : getNextInvaderType(targetInvaderList[yCoordinate][xCoordinate - 1]);
  };

  /**
   * インベーダーを左に移動する
   */
  const moveInvaderToLeft = (
    targetInvaderList: TInvaderType[][],
    xCoordinate: number,
    yCoordinate: number,
    movedCount: number,
  ): TInvaderType => {
    // インベーダーが左端に到達した場合は段を下げる
    if (movedCount > MAX_MOVE_COUNT) {
      const currentInvaderType =
        yCoordinate - 1 < 0
          ? EInvaderType.DEFAULT
          : getNextInvaderType(targetInvaderList[yCoordinate - 1][xCoordinate]);
      if (currentInvaderType !== EInvaderType.DEFAULT && isAtEdge(yCoordinate)) {
        // TODO: imperativeを使用する形に修正する
        setGameStatus(EGameStatus.GAME_OVER);
      }

      return getNextInvaderType(currentInvaderType);
    }

    return xCoordinate + 1 >= targetInvaderList[yCoordinate].length
      ? EInvaderType.DEFAULT
      : getNextInvaderType(targetInvaderList[yCoordinate][xCoordinate + 1]);
  };

  /**
   * インベーダーを移動する
   */
  const moveInvaderList = async (movedCount: number): Promise<void> => {
    setInvaderTwoDimensionalList((currentInvaderTwoDimensionalList) => {
      const newInvaderTwoDimensionalList: TInvaderType[][] = [];
      for (
        let yCoordinate = 0;
        yCoordinate < currentInvaderTwoDimensionalList.length;
        yCoordinate++
      ) {
        const newInvaderList: TInvaderType[] = [];
        for (
          let xCoordinate = 0;
          xCoordinate < currentInvaderTwoDimensionalList[yCoordinate].length;
          xCoordinate++
        ) {
          if (directionRef.current === EDirection.RIGHT) {
            newInvaderList[xCoordinate] = moveInvaderToRight(
              currentInvaderTwoDimensionalList,
              xCoordinate,
              yCoordinate,
              movedCount,
            );
            continue;
          }

          newInvaderList[xCoordinate] = moveInvaderToLeft(
            currentInvaderTwoDimensionalList,
            xCoordinate,
            yCoordinate,
            movedCount,
          );
        }

        newInvaderTwoDimensionalList.push(newInvaderList);
      }

      return newInvaderTwoDimensionalList;
    });
  };

  /**
   * インベーダーの移動方向を更新する
   */
  const handleChangeDirection = () => {
    if (directionRef.current === EDirection.RIGHT) {
      directionRef.current = EDirection.LEFT;
      return;
    }

    directionRef.current = EDirection.RIGHT;
  };

  /**
   * インベーダーの移動の待ち時間を更新する
   */
  const handleChangeSleepTime = () => {
    if (sleepTimeRef.current < 300) {
      return;
    }

    sleepTimeRef.current -= 100;
  };

  /**
   * スタートボタンがクリックされたときの処理
   */
  const handleStart = async () => {
    while (true) {
      await sleep(sleepTimeRef.current);

      movedCountRef.current += 1;
      await moveInvaderList(movedCountRef.current);

      if (movedCountRef.current > MAX_MOVE_COUNT) {
        movedCountRef.current = 0;
        handleChangeDirection();
        handleChangeSleepTime();
      }

      if (destroyedInvaderCount === DEFAULT_INVADER_COUNT) {
        break;
      }
    }
  };

  useEffect(() => {
    handeInitialInvaderList();
    handleStart();
  }, []);

  return (
    <>
      {invaderTwoDimensionalList.map((invaderList, yCoordinate) => {
        return invaderList.map((invaderType, xCoordinate) => {
          return (
            <Invader
              key={`${yCoordinate}-${xCoordinate}`}
              xCoordinate={yCoordinate}
              yCoordinate={xCoordinate}
              invaderType={invaderType}
            />
          );
        });
      })}
    </>
  );
};
