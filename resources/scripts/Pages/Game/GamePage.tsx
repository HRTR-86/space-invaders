import { IPropsBase } from '@/scripts/Common/System';
import { Battery } from '@/scripts/Pages/Game/Battery';
import { Beam } from '@/scripts/Pages/Game/Beam';
import { Coordinate } from '@/scripts/Pages/Game/Coordinate';
import { GameStatus } from '@/scripts/Pages/Game/GameStatus';
import { Score } from '@/scripts/Pages/Game/Score';
import { Ufo } from '@/scripts/Pages/Game/Ufo';
import { Visible } from '@/scripts/Component/Visible';
import { useGameStatusContext } from '@/scripts/Provider/GamaStatusProvider';
import { EGameStatus } from '@/scripts/Enum/GameStatus';
import { BOARD_HEIGHT, BOARD_WIDTH } from '@/scripts/Config/Parameter';

interface IProps extends IPropsBase {}

export const GamePage = (_: IProps) => {
  const { gameStatus } = useGameStatusContext();

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Visible isOpen={gameStatus !== EGameStatus.PLAYING}>
        <GameStatus />
      </Visible>
      <Visible isOpen={gameStatus === EGameStatus.PLAYING}>
        <Score />
        <div
          style={{
            height: `${BOARD_HEIGHT * 10}px`,
            width: `${BOARD_WIDTH * 10}px`,
            position: 'relative',
          }}
        >
          <Ufo />
          <Coordinate />
          <Beam />
          <Battery />
        </div>
      </Visible>
    </div>
  );
};
