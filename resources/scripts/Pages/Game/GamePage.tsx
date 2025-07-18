import { IPropsBase } from '@/scripts/Common/System';
import { Battery } from '@/scripts/Pages/Game/Battery';
import { Beam } from '@/scripts/Pages/Game/Beam';
import { Coordinate } from '@/scripts/Pages/Game/Coordinate';
import { Score } from '@/scripts/Pages/Game/Score';

interface IProps extends IPropsBase {}

export const GamePage = (_: IProps) => {
  return (
    <div>
      <Coordinate />
      <Beam />
      <Battery />
      <Score />
    </div>
  );
};
