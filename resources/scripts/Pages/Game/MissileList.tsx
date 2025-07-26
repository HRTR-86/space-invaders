import { ReactNode, useEffect, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { useInvaderContext } from '@/scripts/Provider/InvaderProvider';
import { Missile } from '@/scripts/Pages/Game/Missile';
import { BOARD_HEIGHT, BOARD_WIDTH } from '@/scripts/Config/Parameter';

interface IProps extends IPropsBase {}

export const MissileList = (_: IProps) => {
  const { invaderTwoDimensionalList, isExist } = useInvaderContext();

  const [missileCoordinateList, setMissileCoordinateList] = useState<ReactNode[]>([]);

  const handleFinished = (index: number) => {
    setMissileCoordinateList((currentMissileCoordinateList) => {
      const missileList = [...currentMissileCoordinateList];
      missileList[index] = null;
      return missileList;
    });
  };

  useEffect(() => {
    if (invaderTwoDimensionalList.length === 0) {
      return;
    }

    for (let count = 0; count < 30; count++) {
      const randomXCoordinate = Math.floor(Math.random() * (BOARD_WIDTH - 24)) + 12;
      const randomYCoordinate = Math.floor(Math.random() * (BOARD_HEIGHT - 7)) + 7;

      if (!isExist(randomXCoordinate, randomYCoordinate)) {
        continue;
      }

      setMissileCoordinateList((currentMissileCoordinateList) => {
        const index = currentMissileCoordinateList.length;

        return [
          ...currentMissileCoordinateList,
          <Missile
            key={`${index}-${randomXCoordinate}-${randomYCoordinate}`}
            xCoordinate={randomXCoordinate}
            yCoordinate={randomYCoordinate}
            onFinished={() => handleFinished(index)}
          />,
        ];
      });
    }
  }, [invaderTwoDimensionalList]);

  return missileCoordinateList.map((missileCoordinate) => {
    return missileCoordinate;
  });
};
