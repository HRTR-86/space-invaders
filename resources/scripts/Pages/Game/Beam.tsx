import { useEffect, useRef, useState } from 'react';
import { IPropsBase, sleep } from '@/scripts/Common/System';
import { Visible } from '@/scripts/Component/Visible';
import { useBatteryContext } from '@/scripts/Provider/BatteryProvider';
import { Coordinate, useBeamContext } from '@/scripts/Provider/BeamProvider';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { useInvaderContext } from '@/scripts/Provider/InvaderProvider';
import { useUfoContext } from '@/scripts/Provider/UfoProvider';
import { EImperative } from '@/scripts/Enum/Imperative';
import { EInvaderType, TInvaderType } from '@/scripts/Enum/InvaderType';
import { EKeyCode } from '@/scripts/Enum/KeyCode';
import { BEAM_SLEEP_TIME, BOARD_HEIGHT } from '@/scripts/Config/Parameter';

interface IDestroyed {
  coordinate: {
    x: number;
    y: number;
  };
  invaderType: TInvaderType;
}

interface IProps extends IPropsBase {}

export const Beam = (_: IProps) => {
  const { handleAddImperative } = useImperativeContext();
  const { invaderTwoDimensionalList, getExistInvaderType } = useInvaderContext();
  const { isExist: isExistUfo, pointRef } = useUfoContext();
  const { batteryCoordinate, isDestroyed } = useBatteryContext();
  const { beamCoordinate, setBeamCoordinate } = useBeamContext();

  const [destroyed, setDestroyed] = useState<IDestroyed>({
    coordinate: {
      x: 0,
      y: 0,
    },
    invaderType: EInvaderType.DEFAULT,
  });

  const isAttackingRef = useRef<boolean>(false);

  /**
   * ビームを撃つ
   */
  const shotBeam = (): Promise<{ coordinate: Coordinate; invaderType: TInvaderType }> => {
    return new Promise(async (resolve) => {
      const shotBeamCoordinateX = batteryCoordinate.x;
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

          const invaderType = getExistInvaderType(shotBeamCoordinateX, newBeamCoordinateY);
          if (invaderType !== EInvaderType.DEFAULT) {
            setDestroyed({
              coordinate: {
                x: shotBeamCoordinateX,
                y: newBeamCoordinateY,
              },
              invaderType: invaderType,
            });
            isAttackingRef.current = false;

            // 初期地点にビームを戻す
            return {
              x: shotBeamCoordinateX,
              y: BOARD_HEIGHT,
            };
          }

          if (isExistUfo(shotBeamCoordinateX, newBeamCoordinateY)) {
            setDestroyed({
              coordinate: {
                x: shotBeamCoordinateX,
                y: newBeamCoordinateY,
              },
              invaderType: EInvaderType.UFO,
            });
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
    if (event.code === EKeyCode.SPACE && !isAttackingRef.current && !isDestroyed) {
      shotBeam().then(({ coordinate, invaderType }) => {
        if (coordinate.x === 0 && coordinate.y === 0) {
          return;
        }

        if (invaderType === EInvaderType.UFO) {
          handleAddImperative({
            message: EImperative.BEAM_HIT_UFO,
            payload: {
              point: pointRef.current,
            },
          });
          return;
        }

        handleAddImperative({
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
    if (destroyed.invaderType === EInvaderType.DEFAULT) {
      return;
    }

    if (destroyed.invaderType === EInvaderType.UFO) {
      handleAddImperative({
        message: EImperative.BEAM_HIT_UFO,
        payload: {
          point: pointRef.current,
        },
      });
      return;
    }

    if (
      destroyed.invaderType === EInvaderType.OCTOPUS ||
      destroyed.invaderType === EInvaderType.CRAB
    ) {
      handleAddImperative({
        message: EImperative.BEAM_HIT_INVADER,
        payload: {
          coordinate: destroyed.coordinate,
          invaderType: destroyed.invaderType,
        },
      });
      return;
    }
  }, [destroyed]);

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
