import { useEffect, useRef } from 'react';
import { IPropsBase, sleep } from '@/scripts/Common/System';
import { Visible } from '@/scripts/Component/Visible';
import { useBatteryContext } from '@/scripts/Provider/BatteryProvider';
import { Coordinate, useBeamContext } from '@/scripts/Provider/BeamProvider';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { useInvaderContext } from '@/scripts/Provider/InvaderProvider';
import { useUfoContext } from '@/scripts/Provider/UfoProvider';
import { EKeyCode } from '@/scripts/Enum/KeyCode';
import { EImperative } from '@/scripts/Enum/Imperative';
import { EInvaderType, TInvaderType } from '@/scripts/Enum/InvaderType';
import { BEAM_SLEEP_TIME, BOARD_HEIGHT } from '@/scripts/Config/Parameter';

interface IProps extends IPropsBase {}

export const Beam = (_: IProps) => {
  const { invaderTwoDimensionalList, isExist: isExistInvader } = useInvaderContext();
  const { isExist: isExistUfo } = useUfoContext();
  const { batteryCoordinate } = useBatteryContext();
  const { beamCoordinate, setBeamCoordinate } = useBeamContext();
  const { setImperative } = useImperativeContext();

  const isAttackingRef = useRef<boolean>(false);

  /**
   * ビームを撃つ
   */
  const shotBeam = (): Promise<{ coordinate: Coordinate; invaderType: TInvaderType }> => {
    return new Promise(async (resolve) => {
      const shotBeamCoordinateX = batteryCoordinate.x;
      let isAttacked = false;
      let hitCoordinate = { x: 0, y: 0 };
      let invaderType: TInvaderType = EInvaderType.DEFAULT;
      isAttackingRef.current = true;

      while (true) {
        setBeamCoordinate((currentBeamCoordinate) => {
          const newBeamCoordinateY = currentBeamCoordinate.y - 1;

          if (newBeamCoordinateY < 1) {
            isAttackingRef.current = false;

            // 初期地点にビームを戻す
            return {
              x: shotBeamCoordinateX,
              y: BOARD_HEIGHT,
            };
          }

          if (isExistInvader(shotBeamCoordinateX, newBeamCoordinateY)) {
            hitCoordinate = { x: shotBeamCoordinateX, y: newBeamCoordinateY };
            invaderType = EInvaderType.CRAB;
            isAttacked = true;
            isAttackingRef.current = false;

            // 初期地点にビームを戻す
            return {
              x: shotBeamCoordinateX,
              y: BOARD_HEIGHT,
            };
          }

          if (isExistUfo(shotBeamCoordinateX, newBeamCoordinateY)) {
            hitCoordinate = { x: shotBeamCoordinateX, y: newBeamCoordinateY };
            invaderType = EInvaderType.UFO;
            isAttacked = true;
            isAttackingRef.current = false;

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

        if (!isAttackingRef.current) {
          if (isAttacked) {
            resolve({
              coordinate: hitCoordinate,
              invaderType: invaderType,
            });
          }

          break;
        }

        await sleep(BEAM_SLEEP_TIME);
      }
    });
  };

  /**
   * キーボードが押されたときの処理
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === EKeyCode.SPACE && !isAttackingRef.current) {
      shotBeam().then(({ coordinate, invaderType }) => {
        if (coordinate.x === 0 && coordinate.y === 0) {
          return;
        }

        if (invaderType === EInvaderType.UFO) {
          setImperative({
            message: EImperative.BEAM_HIT_UFO,
          });
          return;
        }

        setImperative({
          message: EImperative.BEAM_HIT_INVADER,
          payload: {
            coordinate: coordinate,
            invaderType: invaderType,
          },
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
    <Visible isOpen={beamCoordinate.y < BOARD_HEIGHT - 1}>
      <div
        style={{
          height: '20px',
          width: '4px',
          position: 'absolute',
          top: `${beamCoordinate.y * 10}px`,
          left: `${beamCoordinate.x * 10}px`,
          backgroundColor: 'white',
        }}
      />
    </Visible>
  );
};
