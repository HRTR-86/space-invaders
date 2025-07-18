import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { BOARD_HEIGHT, BOARD_WIDTH } from '@/scripts/Config/Parameter';

interface Coordinate {
  x: number;
  y: number;
}

interface BatteryContext {
  batteryCoordinate: Coordinate;
  setBatteryCoordinate: Dispatch<SetStateAction<Coordinate>>;
  isHit: (x: number, y: number) => boolean;
}

interface IProps extends IPropsBase {}

const BatteryContext = createContext<BatteryContext>({
  batteryCoordinate: { x: 0, y: 0 },
  setBatteryCoordinate: () => {},
  isHit: () => false,
});

export const BatteryProvider = ({ children }: IProps) => {
  const [batteryCoordinate, setBatteryCoordinate] = useState<Coordinate>({
    x: Math.round(BOARD_WIDTH / 2),
    y: BOARD_HEIGHT,
  });

  /**
   * 砲台に当たったかどうかを判定する
   */
  const isHit = (x: number, y: number): boolean => {
    return (
      batteryCoordinate.y === y &&
      (batteryCoordinate.x - 1 === x || batteryCoordinate.x === x || batteryCoordinate.x + 1 === x)
    );
  };

  return (
    <BatteryContext.Provider value={{ batteryCoordinate, setBatteryCoordinate, isHit }}>
      {children}
    </BatteryContext.Provider>
  );
};

export const useBatteryContext = () => useContext(BatteryContext);
