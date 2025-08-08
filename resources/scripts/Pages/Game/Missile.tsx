import { useEffect, useState } from 'react';
import { IPropsBase, sleep } from '@/scripts/Common/System';
import { Visible } from '@/scripts/Component/Visible';
import { useBatteryContext } from '@/scripts/Provider/BatteryProvider';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { EImperative } from '@/scripts/Enum/Imperative';
import { BOARD_HEIGHT, MISSILE_SLEEP_TIME } from '@/scripts/Config/Parameter';

interface Coordinate {
  x: number;
  y: number;
}

interface IProps extends IPropsBase {
  xCoordinate: number;
  yCoordinate: number;
  onFinished: () => void;
}

export const Missile = ({ xCoordinate, yCoordinate, onFinished }: IProps) => {
  const { isExist } = useBatteryContext();
  const { handleAddImperative } = useImperativeContext();

  const [missileCoordinate, setMissileCoordinate] = useState<Coordinate>({ x: 0, y: 0 });

  /**
   * ミサイルを撃つ
   */
  const shotMissile = (
    shotMissileCoordinateX: number,
    shotMissileCoordinateY: number,
  ): Promise<boolean> => {
    setMissileCoordinate({ x: shotMissileCoordinateX, y: shotMissileCoordinateY });

    return new Promise(async (resolve) => {
      let isAttacked = false;
      let isFinished = false;

      while (true) {
        setMissileCoordinate((currentMissileCoordinate) => {
          const newMissileCoordinateY = currentMissileCoordinate.y + 1;

          if (newMissileCoordinateY > BOARD_HEIGHT) {
            isFinished = true;

            // 初期地点にミサイルを戻す
            return {
              x: shotMissileCoordinateX,
              y: shotMissileCoordinateY,
            };
          }

          if (isExist(shotMissileCoordinateX, newMissileCoordinateY)) {
            isAttacked = true;

            // 初期地点にミサイルを戻す
            return {
              x: shotMissileCoordinateX,
              y: shotMissileCoordinateY,
            };
          }

          // ミサイルを進める
          return {
            x: shotMissileCoordinateX,
            y: newMissileCoordinateY,
          };
        });

        if (isAttacked || isFinished) {
          resolve(isAttacked);
          break;
        }

        await sleep(MISSILE_SLEEP_TIME);
      }
    });
  };

  /**
   * ミサイルの表示条件を満たしているかどうかを確認する
   */
  const isDisplay = (x: number, y: number): boolean => {
    if (y === missileCoordinate.y) {
      return false;
    }

    if (x === 0 || y === 0) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (xCoordinate <= 0 || yCoordinate <= 0) {
      return;
    }

    shotMissile(xCoordinate, yCoordinate).then((isAttacked) => {
      if (isAttacked) {
        handleAddImperative({
          message: EImperative.MISSILE_HIT_BATTERY,
        });
      }

      onFinished();
    });
  }, [xCoordinate, yCoordinate]);

  return (
    <Visible isOpen={isDisplay(xCoordinate, yCoordinate)}>
      <div
        style={{
          height: '15px',
          width: '4px',
          position: 'absolute',
          top: `${missileCoordinate.y * 10}px`,
          left: `${missileCoordinate.x * 10}px`,
          backgroundColor: 'white',
        }}
      />
    </Visible>
  );
};
