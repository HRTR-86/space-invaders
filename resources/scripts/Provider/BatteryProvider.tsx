import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IPropsBase, sleep } from '@/scripts/Common/System';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { BOARD_HEIGHT, BOARD_WIDTH } from '@/scripts/Config/Parameter';
import { EImperative } from '@/scripts/Enum/Imperative';

interface Coordinate {
  x: number;
  y: number;
}

interface BatteryContext {
  batteryCoordinate: Coordinate;
  setBatteryCoordinate: Dispatch<SetStateAction<Coordinate>>;
  isExist: (x: number, y: number) => boolean;
  isDestroyed: boolean;
}

interface IProps extends IPropsBase {}

const BatteryContext = createContext<BatteryContext>({
  batteryCoordinate: { x: 0, y: 0 },
  setBatteryCoordinate: () => {},
  isExist: () => false,
  isDestroyed: false,
});

export const BatteryProvider = ({ children }: IProps) => {
  const { imperative } = useImperativeContext();

  const [batteryCoordinate, setBatteryCoordinate] = useState<Coordinate>({
    x: Math.round(BOARD_WIDTH / 2),
    y: BOARD_HEIGHT,
  });
  const [isDestroyed, setIsDestroyed] = useState<boolean>(false);

  const batteryCoordinateRef = useRef<Coordinate>(batteryCoordinate);
  batteryCoordinateRef.current = batteryCoordinate;

  /**
   * 砲台が存在するかどうかを確認する
   */
  const isExist = (x: number, y: number): boolean => {
    if (batteryCoordinateRef.current.y - y > 1) {
      return false;
    }

    return Math.abs(batteryCoordinateRef.current.x - x) < 3;
  };

  /**
   * 砲台がミサイルに当たった場合の処理
   */
  const handleChangeAttacked = async () => {
    setIsDestroyed(true);
    await sleep(2000);
    setIsDestroyed(false);
  };

  useEffect(() => {
    if (imperative.message !== EImperative.MISSILE_HIT_BATTERY) {
      return;
    }

    handleChangeAttacked();
  }, [imperative]);

  return (
    <BatteryContext.Provider
      value={{ batteryCoordinate, setBatteryCoordinate, isExist, isDestroyed }}
    >
      {children}
    </BatteryContext.Provider>
  );
};

export const useBatteryContext = () => useContext(BatteryContext);
