import { IPropsBase } from '@/scripts/Common/System';
import { Battery } from '@/scripts/Pages/Game/Battery';
import { Beam } from '@/scripts/Pages/Game/Beam';
import { Coordinate } from '@/scripts/Pages/Game/Coordinate';
import { GameStatus } from '@/scripts/Pages/Game/GameStatus';
import { Score } from '@/scripts/Pages/Game/Score';
import { Visible } from '@/scripts/Component/Visible';
import { useGameStatusContext } from '@/scripts/Provider/GamaStatusProvider';
import { EGameStatus } from '@/scripts/Enum/GameStatus';

interface IProps extends IPropsBase {}

export const GamePage = (_: IProps) => {
  const { gameStatus } = useGameStatusContext();

  return (
    <div>
      <Visible isOpen={gameStatus !== EGameStatus.PLAYING}>
        <GameStatus />
      </Visible>
      <Visible isOpen={gameStatus === EGameStatus.PLAYING}>
        <Coordinate />
        <Beam />
        <Battery />
        <Score />
      </Visible>
    </div>
  );
};
