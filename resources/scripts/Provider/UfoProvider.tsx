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
import { useGameStatusContext } from '@/scripts/Provider/GamaStatusProvider';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { EImperative } from '@/scripts/Enum/Imperative';
import { EInvaderType } from '@/scripts/Enum/InvaderType';
import { DEFAULT_UFO_COORDINATE } from '@/scripts/Config/Parameter';

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
  pointRef: RefObject<number>;
  handleUpdatePoint: () => void;
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
  pointRef: { current: 0 },
  handleUpdatePoint: () => {},
});

export const UfoProvider = ({ children }: IProps) => {
  const { imperativeList } = useImperativeContext();
  const { handleAddScore } = useGameStatusContext();

  const [ufoCoordinate, setUfoCoordinate] = useState<Coordinate>({
    x: DEFAULT_UFO_COORDINATE.X,
    y: DEFAULT_UFO_COORDINATE.Y,
  });
  const [isDestroyed, setIsDestroyed] = useState<boolean>(false);

  const pointRef = useRef<number>(0);
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
   * UFOのポイントを更新する
   */
  const handleUpdatePoint = (): void => {
    const seed = Math.floor(Math.random() * 20) + 1;
    if (seed === 1) {
      pointRef.current = 300;
      return;
    }

    if (seed <= 3) {
      pointRef.current = 150;
      return;
    }

    if (seed <= 10) {
      pointRef.current = 100;
      return;
    }

    pointRef.current = 50;
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
    const lastImperative = imperativeList.at(-1);
    if (lastImperative === undefined) {
      return;
    }

    if (lastImperative.message === EImperative.BEAM_HIT_UFO) {
      const { point } = lastImperative.payload as {
        point: number;
      };

      handleChangeIsMoving(false);
      handleChangeAttacked();
      handleAddScore(EInvaderType.UFO, point);
    }
  }, [imperativeList]);

  return (
    <UfoContext.Provider
      value={{
        ufoCoordinate,
        setUfoCoordinate,
        isDestroyed,
        isExist,
        isMovingRef,
        handleChangeIsMoving,
        pointRef,
        handleUpdatePoint,
      }}
    >
      {children}
    </UfoContext.Provider>
  );
};

export const useUfoContext = () => useContext(UfoContext);
