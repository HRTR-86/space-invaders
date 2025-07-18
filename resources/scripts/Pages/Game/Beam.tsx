import { useEffect, useRef } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { Visible } from '@/scripts/Component/Visible';
import { useBatteryContext } from '@/scripts/Provider/BatteryProvider';
import { Coordinate, useBeamContext } from '@/scripts/Provider/BeamProvider';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { useInvaderContext } from '@/scripts/Provider/InvaderProvider';
import { EKeyCode } from '@/scripts/Enum/KeyCode';
import { EImperative } from '@/scripts/Enum/Imperative';
import { BOARD_HEIGHT } from '@/scripts/Config/Parameter';

interface IProps extends IPropsBase {}

export const Beam = (_: IProps) => {
  const { invaderTwoDimensionalList, isHit } = useInvaderContext();
  const { batteryCoordinate } = useBatteryContext();
  const { beamCoordinate, setBeamCoordinate } = useBeamContext();
  const { setImperative } = useImperativeContext();

  const isAttackingRef = useRef<boolean>(false);

  /**
   * ビームを撃つ
   */
  const shotBeam = (): Promise<Coordinate> => {
    return new Promise((resolve) => {
      let shotBeamCoordinateX = 0;
      let isAttacked = false;
      let hitCoordinate = { x: 0, y: 0 };
      isAttackingRef.current = true;

      const interval = setInterval(() => {
        if (shotBeamCoordinateX === 0) {
          shotBeamCoordinateX = batteryCoordinate.x;
        }

        setBeamCoordinate((currentBeamCoordinate) => {
          const newBeamCoordinateY = currentBeamCoordinate.y - 1;

          if (newBeamCoordinateY < 0) {
            clearInterval(interval);
            isAttackingRef.current = false;
            return {
              x: shotBeamCoordinateX,
              y: BOARD_HEIGHT,
            };
          }

          if (isHit(shotBeamCoordinateX, newBeamCoordinateY)) {
            hitCoordinate = { x: shotBeamCoordinateX, y: newBeamCoordinateY };
            isAttacked = true;
          }

          if (isAttacked) {
            // 初期地点にビームを戻す
            return {
              x: shotBeamCoordinateX,
              y: BOARD_HEIGHT,
            };
          }

          // ビームを進める
          return {
            x: shotBeamCoordinateX,
            y: newBeamCoordinateY,
          };
        });

        if (isAttacked) {
          clearInterval(interval);
          isAttackingRef.current = false;
          resolve(hitCoordinate);
        }
      }, 5);
    });
  };

  /**
   * キーボードが押されたときの処理
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === EKeyCode.SPACE && !isAttackingRef.current) {
      shotBeam().then((coordinate) => {
        if (coordinate.x === 0 && coordinate.y === 0) {
          return;
        }

        setImperative({
          message: EImperative.BEAM_HIT_INVADER,
          payload: coordinate,
        });
      });
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [invaderTwoDimensionalList, batteryCoordinate.x]);

  return (
    <Visible isOpen={beamCoordinate.y < 70}>
      <div
        style={{
          height: '30px',
          width: '4px',
          position: 'absolute',
          top: `${beamCoordinate.y * 10}px`,
          left: `${beamCoordinate.x * 10}px`,
          backgroundColor: 'black',
        }}
      />
    </Visible>
  );
};
