import { useEffect, useRef, useState } from 'react';
import { IPropsBase, sleep } from '@/scripts/Common/System';
import { useInvaderContext } from '@/scripts/Provider/InvaderProvider';
import { Invader } from '@/scripts/Pages/Game/Invader';
import { Visible } from '@/scripts/Component/Visible';
import { EDirection, TDirection } from '@/scripts/Enum/Direction';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DEFAULT_INVADER_COLUMN_LIST,
  DEFAULT_INVADER_COUNT,
  DEFAULT_INVADER_ROW_LIST,
  MAX_MOVE_COUNT,
  SLEEP_TIME,
} from '@/scripts/Config/Parameter';
import { Missile } from '@/scripts/Pages/Game/Missile';

interface IProps extends IPropsBase {}

export const Coordinate = (_: IProps) => {
  const { invaderTwoDimensionalList, setInvaderTwoDimensionalList, destroyedInvaderCount } =
    useInvaderContext();

  const [isStarted, setIsStarted] = useState<boolean>(false);

  const sleepTimeRef = useRef<number>(SLEEP_TIME);
  const directionRef = useRef<TDirection>(EDirection.RIGHT);
  const movedCountRef = useRef<number>(0);

  /**
   * インベーダーの一覧を初期化する
   */
  const initialInvaderList = () => {
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
   * インベーダーを右に移動する
   */
  const moveInvaderToRight = (
    targetInvaderList: boolean[][],
    xCoordinate: number,
    yCoordinate: number,
    movedCount: number,
  ) => {
    // インベーダーが右端に到達した場合は段を下げる
    if (movedCount > MAX_MOVE_COUNT) {
      return yCoordinate - 1 < 0 ? false : targetInvaderList[yCoordinate - 1][xCoordinate];
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
      return yCoordinate - 1 < 0 ? false : targetInvaderList[yCoordinate - 1][xCoordinate];
    }

    return xCoordinate + 1 >= targetInvaderList[yCoordinate].length
      ? false
      : targetInvaderList[yCoordinate][xCoordinate + 1];
  };

  /**
   * インベーダーを移動する
   */
  const moveInvaderList = async (movedCount: number) => {
    setInvaderTwoDimensionalList((currentInvaderTwoDimensionalList) => {
      const newInvaderTwoDimensionalList = [];
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
  const handleClickStart = async () => {
    setIsStarted(true);

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
    initialInvaderList();
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Visible isOpen={!isStarted}>
        <button onClick={handleClickStart}>Start</button>
      </Visible>
      <Missile
        xCoordinate={60}
        yCoordinate={10}
      />
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
