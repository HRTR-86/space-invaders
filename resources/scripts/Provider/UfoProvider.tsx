import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IPropsBase, sleep } from '@/scripts/Common/System';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { EImperative } from '@/scripts/Enum/Imperative';
import { DEFAULT_UFO_COORDINATE } from '@/scripts/Config/Parameter';
import { EGameStatus } from '@/scripts/Enum/GameStatus';

interface Coordinate {
  x: number;
  y: number;
}

interface UfoContext {
  ufoCoordinate: Coordinate;
  setUfoCoordinate: Dispatch<SetStateAction<Coordinate>>;
  isDestroyed: boolean;
  isExist: (x: number, y: number) => boolean;
  isMovingRef: RefObject<boolean>;
  handleChangeIsMoving: (isMoving: boolean) => void;
}

interface IProps extends IPropsBase {}

const UfoContext = createContext<UfoContext>({
  ufoCoordinate: {
    x: DEFAULT_UFO_COORDINATE.X,
    y: DEFAULT_UFO_COORDINATE.Y,
  },
  setUfoCoordinate: () => {},
  isDestroyed: false,
  isExist: () => false,
  isMovingRef: { current: false },
  handleChangeIsMoving: () => {},
});

export const UfoProvider = ({ children }: IProps) => {
  const { imperative } = useImperativeContext();

  const [ufoCoordinate, setUfoCoordinate] = useState<Coordinate>({
    x: DEFAULT_UFO_COORDINATE.X,
    y: DEFAULT_UFO_COORDINATE.Y,
  });
  const [isDestroyed, setIsDestroyed] = useState<boolean>(false);

  const isMovingRef = useRef<boolean>(false);
  const ufoCoordinateRef = useRef<Coordinate>(ufoCoordinate);
  ufoCoordinateRef.current = ufoCoordinate;

  /**
   * 砲台が存在するかどうかを確認する
   */
  const isExist = (x: number, y: number): boolean => {
    if (ufoCoordinateRef.current.y !== y) {
      return false;
    }

    return Math.abs(ufoCoordinateRef.current.x - x) < 4;
  };

  /**
   * 移動中かどうかを更新する
   */
  const handleChangeIsMoving = (isMoving: boolean) => {
    isMovingRef.current = isMoving;
  };

  /**
   * 砲台がミサイルに当たった場合の処理
   */
  const handleChangeAttacked = async () => {
    if (isDestroyed) {
      return;
    }

    setIsDestroyed(true);
    await sleep(800);
    setUfoCoordinate({
      x: DEFAULT_UFO_COORDINATE.X,
      y: DEFAULT_UFO_COORDINATE.Y,
    });
    setIsDestroyed(false);
  };

  useEffect(() => {
    if (imperative.message !== EImperative.BEAM_HIT_UFO) {
      return;
    }

    handleChangeIsMoving(false);

    handleChangeAttacked();
  }, [imperative]);

  return (
    <UfoContext.Provider
      value={{
        ufoCoordinate,
        setUfoCoordinate,
        isDestroyed,
        isExist,
        isMovingRef,
        handleChangeIsMoving,
      }}
    >
      {children}
    </UfoContext.Provider>
  );
};

export const useUfoContext = () => useContext(UfoContext);
