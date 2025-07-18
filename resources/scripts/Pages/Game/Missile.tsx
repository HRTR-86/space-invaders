import { useEffect, useRef, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { Visible } from '@/scripts/Component/Visible';
import { useBatteryContext } from '@/scripts/Provider/BatteryProvider';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { BOARD_HEIGHT } from '@/scripts/Config/Parameter';
import { EImperative } from '@/scripts/Enum/Imperative';

interface Coordinate {
  x: number;
  y: number;
}

interface IProps extends IPropsBase {
  xCoordinate: number;
  yCoordinate: number;
}

export const Missile = ({ xCoordinate, yCoordinate }: IProps) => {
  const { isHit } = useBatteryContext();
  const [missileCoordinate, setMissileCoordinate] = useState<Coordinate>({ x: 0, y: 0 });
  const { setImperative } = useImperativeContext();

  const isAttackingRef = useRef<boolean>(false);
  const intervalIdRef = useRef<number>(0);

  /**
   * ミサイルを撃つ
   */
  const shotMissile = (
    shotMissileCoordinateX: number,
    shotMissileCoordinateY: number,
  ): Promise<boolean> => {
    setMissileCoordinate({ x: shotMissileCoordinateX, y: shotMissileCoordinateY });

    return new Promise((resolve) => {
      let isAttacked = false;

      intervalIdRef.current = setInterval(() => {
        setMissileCoordinate((currentMissileCoordinate) => {
          const newMissileCoordinateY = currentMissileCoordinate.y + 1;

          if (isHit(shotMissileCoordinateX, newMissileCoordinateY)) {
            isAttacked = true;

            // 初期地点にミサイルを戻す
            return {
              x: shotMissileCoordinateX,
              y: BOARD_HEIGHT,
            };
          }

          if (newMissileCoordinateY > BOARD_HEIGHT) {
            clearInterval(intervalIdRef.current);
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

        if (isAttacked) {
          clearInterval(intervalIdRef.current);
          isAttackingRef.current = false;
          resolve(true);
        }
      }, 25);
    });
  };

  useEffect(() => {
    if (xCoordinate < 0 || yCoordinate < 0) {
      return;
    }

    shotMissile(xCoordinate, yCoordinate).then((isHit) => {
      if (isHit) {
        setImperative({
          message: EImperative.MISSILE_HIT_BATTERY,
        });
      }
    });

    return () => {
      if (intervalIdRef.current !== 0) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [xCoordinate, yCoordinate]);

  return (
    <Visible isOpen={missileCoordinate.x !== 0 && missileCoordinate.y !== 0}>
      <div
        style={{
          height: '20px',
          width: '4px',
          position: 'absolute',
          top: `${missileCoordinate.y * 10}px`,
          left: `${missileCoordinate.x * 10}px`,
          backgroundColor: 'black',
        }}
      />
    </Visible>
  );
};
