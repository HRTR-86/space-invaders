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
import { EImperative } from '@/scripts/Enum/Imperative';
import { BOARD_HEIGHT, BOARD_WIDTH, LIFE_COUNT } from '@/scripts/Config/Parameter';

interface Coordinate {
  x: number;
  y: number;
}

interface BatteryContext {
  batteryCoordinate: Coordinate;
  setBatteryCoordinate: Dispatch<SetStateAction<Coordinate>>;
  isExist: (x: number, y: number) => boolean;
  isDestroyed: boolean;
  life: number;
}

interface IProps extends IPropsBase {}

const BatteryContext = createContext<BatteryContext>({
  batteryCoordinate: { x: 0, y: 0 },
  setBatteryCoordinate: () => {},
  isExist: () => false,
  isDestroyed: false,
  life: LIFE_COUNT,
});

export const BatteryProvider = ({ children }: IProps) => {
  const { imperativeList, handleAddImperative } = useImperativeContext();

  const [batteryCoordinate, setBatteryCoordinate] = useState<Coordinate>({
    x: Math.round(BOARD_WIDTH / 2),
    y: BOARD_HEIGHT,
  });
  const [isDestroyed, setIsDestroyed] = useState<boolean>(false);
  const [life, setLife] = useState<number>(LIFE_COUNT);

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
    if (isDestroyed) {
      return;
    }

    setIsDestroyed(true);
    await sleep(1000);
    setLife((currentLife) => {
      if (currentLife === 0) {
        handleAddImperative({
          message: EImperative.ALL_BATTERY_DESTROYED,
        });
        return 0;
      }

      return currentLife - 1;
    });
    setIsDestroyed(false);
  };

  useEffect(() => {
    const lastImperative = imperativeList.at(-1);
    if (lastImperative === undefined) {
      return;
    }

    if (lastImperative.message === EImperative.MISSILE_HIT_BATTERY) {
      handleChangeAttacked();
    }
  }, [imperativeList]);

  return (
    <BatteryContext.Provider
      value={{ batteryCoordinate, setBatteryCoordinate, isExist, isDestroyed, life }}
    >
      {children}
    </BatteryContext.Provider>
  );
};

export const useBatteryContext = () => useContext(BatteryContext);
