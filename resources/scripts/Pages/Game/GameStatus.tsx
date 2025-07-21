import { IPropsBase } from '@/scripts/Common/System';
import { useGameStatusContext } from '@/scripts/Provider/GamaStatusProvider';
import { EGameStatus } from '@/scripts/Enum/GameStatus';

interface IProps extends IPropsBase {}

export const GameStatus = (_: IProps) => {
  const { gameStatus, setGameStatus } = useGameStatusContext();

  /**
   * スタートボタンが押されたときの処理
   */
  const handleStart = () => {
    setGameStatus(EGameStatus.PLAYING);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {gameStatus === EGameStatus.DEFAULT && <button onClick={handleStart}>Start</button>}
      {gameStatus === EGameStatus.GAME_OVER && <p>Game Over</p>}
      {gameStatus === EGameStatus.GAME_CLEAR && <p>Game Clear</p>}
    </div>
  );
};
