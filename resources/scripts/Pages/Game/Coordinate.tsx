import { useEffect, useRef, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { useInvaderContext } from '@/scripts/Provider/InvaderProvider';
import { Invader } from '@/scripts/Pages/Game/Invader';
import { Visible } from '@/scripts/Component/Visible';
import { EDirection, TDirection } from '@/scripts/Enum/Direction';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DEFAULT_INVADER_COLUMN_LIST,
  DEFAULT_INVADER_ROW_LIST,
  MAX_MOVE_COUNT,
  SLEEP_TIME,
} from '@/scripts/Config/Parameter';
import { Missile } from '@/scripts/Pages/Game/Missile';

interface IProps extends IPropsBase {}

export const Coordinate = (_: IProps) => {
  const { invaderTwoDimensionalList, setInvaderTwoDimensionalList } = useInvaderContext();

  const [isStarted, setIsStarted] = useState<boolean>(false);

  const intervalIdRef = useRef<number>(0);
  const sleepTimeRef = useRef<number>(SLEEP_TIME);
  const directionRef = useRef<TDirection>(EDirection.RIGHT);
  const moveCountRef = useRef<number>(0);

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
  ) => {
    // インベーダーが右端に到達した場合は段を下げる
    if (moveCountRef.current === MAX_MOVE_COUNT) {
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
  ) => {
    // インベーダーが左端に到達した場合は段を下げる
    if (moveCountRef.current === MAX_MOVE_COUNT) {
      return yCoordinate - 1 < 0 ? false : targetInvaderList[yCoordinate - 1][xCoordinate];
    }

    return xCoordinate + 1 >= targetInvaderList[yCoordinate].length
      ? false
      : targetInvaderList[yCoordinate][xCoordinate + 1];
  };

  /**
   * インベーダーを移動する
   */
  const moveInvaderList = () => {
    moveCountRef.current += 1;

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
            );
            continue;
          }

          newInvaderList[xCoordinate] = moveInvaderToLeft(
            currentInvaderTwoDimensionalList,
            xCoordinate,
            yCoordinate,
          );
        }

        newInvaderTwoDimensionalList.push(newInvaderList);
      }

      return newInvaderTwoDimensionalList;
    });

    if (moveCountRef.current > MAX_MOVE_COUNT) {
      directionRef.current =
        directionRef.current === EDirection.RIGHT ? EDirection.LEFT : EDirection.RIGHT;
      moveCountRef.current = 0;
      updateSleepTime();
    }
  };

  /**
   * インベーダーの移動の待ち時間を更新する
   */
  const updateSleepTime = () => {
    if (sleepTimeRef.current < 300) {
      return;
    }

    sleepTimeRef.current -= 100;
  };

  /**
   * スタートボタンがクリックされたときの処理
   */
  const handleClickStart = () => {
    intervalIdRef.current = setInterval(() => {
      moveInvaderList();
    }, sleepTimeRef.current);

    setIsStarted(true);
  };

  useEffect(() => {
    initialInvaderList();
  }, []);

  useEffect(() => {
    if (sleepTimeRef.current === SLEEP_TIME) {
      return;
    }

    clearInterval(intervalIdRef.current);

    intervalIdRef.current = setInterval(() => {
      moveInvaderList();
    }, sleepTimeRef.current);

    return () => clearInterval(intervalIdRef.current);
  }, [sleepTimeRef.current]);

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
