import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { BOARD_HEIGHT, BOARD_WIDTH } from '@/scripts/Config/Parameter';

export interface Coordinate {
  x: number;
  y: number;
}

interface BeamContext {
  beamCoordinate: Coordinate;
  setBeamCoordinate: Dispatch<SetStateAction<Coordinate>>;
}

interface IProps extends IPropsBase {}

const BeamContext = createContext<BeamContext>({
  beamCoordinate: { x: 0, y: 0 },
  setBeamCoordinate: () => {},
});

export const BeamProvider = ({ children }: IProps) => {
  const [beamCoordinate, setBeamCoordinate] = useState<Coordinate>({
    x: Math.round(BOARD_WIDTH / 2),
    y: BOARD_HEIGHT,
  });

  return (
    <BeamContext.Provider value={{ beamCoordinate, setBeamCoordinate }}>
      {children}
    </BeamContext.Provider>
  );
};

export const useBeamContext = () => useContext(BeamContext);
