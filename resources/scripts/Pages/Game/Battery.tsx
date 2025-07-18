import { useEffect } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { Visible } from '@/scripts/Component/Visible';
import { useBatteryContext } from '@/scripts/Provider/BatteryProvider';
import { EKeyCode } from '@/scripts/Enum/KeyCode';
import { BOARD_WIDTH } from '@/scripts/Config/Parameter';

interface IProps extends IPropsBase {}

export const Battery = (_: IProps) => {
  const { batteryCoordinate, setBatteryCoordinate } = useBatteryContext();

  /**
   * 砲台を右に移動する
   */
  const moveBatteryToRight = (currentBatteryCoordinate: { x: number; y: number }) => {
    setBatteryCoordinate((currentBatteryCoordinate) => {
      if (currentBatteryCoordinate.x >= BOARD_WIDTH - 1) {
        return {
          x: BOARD_WIDTH - 1,
          y: currentBatteryCoordinate.y,
        };
      }

      return {
        x: currentBatteryCoordinate.x + 1,
        y: currentBatteryCoordinate.y,
      };
    });
  };

  /**
   * 砲台を左に移動する
   */
  const moveBatteryToLeft = (currentBatteryCoordinate: { x: number; y: number }) => {
    setBatteryCoordinate((currentBatteryXCoordinate) => {
      if (currentBatteryXCoordinate.x <= 0) {
        return {
          x: 0,
          y: currentBatteryXCoordinate.y,
        };
      }

      return {
        x: currentBatteryXCoordinate.x - 1,
        y: currentBatteryXCoordinate.y,
      };
    });
  };

  /**
   * キーボードが押されたときの処理
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === EKeyCode.ARROW_RIGHT) {
      moveBatteryToRight(batteryCoordinate);
    }

    if (event.code === EKeyCode.ARROW_LEFT) {
      moveBatteryToLeft(batteryCoordinate);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Visible isOpen={true}>
      <div
        style={{
          height: '20px',
          width: '40px',
          position: 'absolute',
          top: `700px`,
          left: `calc(${batteryCoordinate.x * 10}px - 20px)`,
          backgroundColor: 'black',
        }}
      />
    </Visible>
  );
};
