import { useEffect, useRef } from 'react';
import { IPropsBase, sleep } from '@/scripts/Common/System';
import { useGameStatusContext } from '@/scripts/Provider/GamaStatusProvider';
import { useInvaderContext } from '@/scripts/Provider/InvaderProvider';
import { Invader } from '@/scripts/Pages/Game/Invader';
import { MissileList } from '@/scripts/Pages/Game/MissileList';
import { EDirection, TDirection } from '@/scripts/Enum/Direction';
import { EGameStatus } from '@/scripts/Enum/GameStatus';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DEFAULT_INVADER_COLUMN_LIST,
  DEFAULT_INVADER_COUNT,
  DEFAULT_INVADER_ROW_LIST,
  MAX_MOVE_COUNT,
  INVADER_SLEEP_TIME,
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
      Array.from({ length: BOARD_HEIGHT }, (_, yCoordinate) => {
        return Array.from({ length: BOARD_WIDTH }, (_, xCoordinate) => {
          if (!DEFAULT_INVADER_ROW_LIST.includes(yCoordinate)) {
            return false;
          }

          if (!DEFAULT_INVADER_COLUMN_LIST.includes(xCoordinate)) {
            return false;
          }

          return true;
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
   * インベーダーを右に移動する
   */
  const moveInvaderToRight = (
    targetInvaderList: boolean[][],
    xCoordinate: number,
    yCoordinate: number,
    movedCount: number,
  ): boolean => {
    // インベーダーが右端に到達した場合は段を下げる
    if (movedCount > MAX_MOVE_COUNT) {
      const isExist = yCoordinate - 1 < 0 ? false : targetInvaderList[yCoordinate - 1][xCoordinate];
      if (isExist && isAtEdge(yCoordinate)) {
        // TODO: imperativeを使用する形に修正する
        setGameStatus(EGameStatus.GAME_OVER);
      }

      return isExist;
    }

    return xCoordinate - 1 < 0 ? false : targetInvaderList[yCoordinate][xCoordinate - 1];
  };

  /**
   * インベーダーを左に移動する
   */
  const moveInvaderToLeft = (
    targetInvaderList: boolean[][],
    xCoordinate: number,
    yCoordinate: number,
    movedCount: number,
  ) => {
    // インベーダーが左端に到達した場合は段を下げる
    if (movedCount > MAX_MOVE_COUNT) {
      const isExist = yCoordinate - 1 < 0 ? false : targetInvaderList[yCoordinate - 1][xCoordinate];
      if (isExist && isAtEdge(yCoordinate)) {
        // TODO: imperativeを使用する形に修正する
        setGameStatus(EGameStatus.GAME_OVER);
      }

      return isExist;
    }

    return xCoordinate + 1 >= targetInvaderList[yCoordinate].length
      ? false
      : targetInvaderList[yCoordinate][xCoordinate + 1];
  };

  /**
   * インベーダーを移動する
   */
  const moveInvaderList = async (movedCount: number): Promise<void> => {
    setInvaderTwoDimensionalList((currentInvaderTwoDimensionalList) => {
      const newInvaderTwoDimensionalList: boolean[][] = [];
      for (
        let yCoordinate = 0;
        yCoordinate < currentInvaderTwoDimensionalList.length;
        yCoordinate++
      ) {
        const newInvaderList = [];
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
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <MissileList />
      {invaderTwoDimensionalList.map((invaderList, yCoordinate) => {
        return invaderList.map((invader, xCoordinate) => {
          return (
            <Invader
              key={`${yCoordinate}-${xCoordinate}`}
              xCoordinate={yCoordinate}
              yCoordinate={xCoordinate}
              isDisplay={invader}
            />
          );
        });
      })}
    </div>
  );
};
