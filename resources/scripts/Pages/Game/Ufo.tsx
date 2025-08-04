import { useEffect, useRef } from 'react';
import { IPropsBase, sleep } from '@/scripts/Common/System';
import { Visible } from '@/scripts/Component/Visible';
import { useInvaderContext } from '@/scripts/Provider/InvaderProvider';
import { useUfoContext } from '@/scripts/Provider/UfoProvider';
import {
  BOARD_WIDTH,
  DEFAULT_INVADER_COUNT,
  DEFAULT_UFO_COORDINATE,
  UFO_INTERVAL,
  UFO_SLEEP_TIME,
} from '@/scripts/Config/Parameter';

interface IProps extends IPropsBase {}

export const Ufo = (_: IProps) => {
  const { destroyedInvaderCount } = useInvaderContext();
  const { ufoCoordinate, setUfoCoordinate, isDestroyed, isMovingRef, handleChangeIsMoving } =
    useUfoContext();

  let destroyedInvaderCountRef = useRef(destroyedInvaderCount);
  destroyedInvaderCountRef.current = destroyedInvaderCount;

  /**
   * UFOの出現を繰り返す
   */
  const startInterval = async () => {
    while (true) {
      await sleep(UFO_INTERVAL);

      if (DEFAULT_INVADER_COUNT - destroyedInvaderCountRef.current <= 1) {
        break;
      }

      await moveUfo();
    }
  };

  /**
   * UFOを動かす
   */
  const moveUfo = (): Promise<void> => {
    return new Promise(async (resolve) => {
      handleChangeIsMoving(true);
      let isFinished = false;

      while (true) {
        setUfoCoordinate((currentUfoCoordinate) => {
          const newUfoCoordinateX = currentUfoCoordinate.x + 1;

          if (newUfoCoordinateX > BOARD_WIDTH) {
            isFinished = true;

            return {
              x: DEFAULT_UFO_COORDINATE.X,
              y: currentUfoCoordinate.y,
            };
          }

          return {
            x: newUfoCoordinateX,
            y: currentUfoCoordinate.y,
          };
        });

        if (isFinished || !isMovingRef.current) {
          handleChangeIsMoving(false);
          resolve();
          break;
        }

        await sleep(UFO_SLEEP_TIME);
      }
    });
  };

  /**
   * UFOの画像のファイルパスを取得する
   */
  const getFilePath = (isDestroyed: boolean): string => {
    if (isDestroyed) {
      return '/images/ufo2.png';
    }

    return '/images/ufo1.png';
  };

  useEffect(() => {
    startInterval();
  }, []);

  return (
    <Visible isOpen={ufoCoordinate.x > 1}>
      <img
        style={{
          height: '24px',
          width: '48px',
          position: 'absolute',
          top: `${ufoCoordinate.y * 10}px`,
          left: `calc(${ufoCoordinate.x * 10}px - 24px)`,
          objectFit: 'cover',
        }}
        alt={'ufo'}
        src={getFilePath(isDestroyed)}
      />
    </Visible>
  );
};
