import { useEffect } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { PointLabel } from '@/scripts/Pages/Game/PointLabel';
import { useGameStatusContext } from '@/scripts/Provider/GamaStatusProvider';
import { useImperativeContext } from '@/scripts/Provider/ImperativeProvider';
import { EGameStatus } from '@/scripts/Enum/GameStatus';
import { EImperative } from '@/scripts/Enum/Imperative';
import { EInvaderType } from '@/scripts/Enum/InvaderType';
import { EKeyCode } from '@/scripts/Enum/KeyCode';

interface IProps extends IPropsBase {}

export const GameStatus = (_: IProps) => {
  const { gameStatus } = useGameStatusContext();
  const { handleAddImperative } = useImperativeContext();

  /**
   * ゲームを開始する
   */
  const startGame = () => {
    handleAddImperative({
      message: EImperative.INITIALIZE_SETTINGS,
    });
  };

  /**
   * キーボードが押されたときの処理
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === EKeyCode.SPACE && gameStatus === EGameStatus.DEFAULT) {
      startGame();
    }

    if (event.code === EKeyCode.BACKSPACE && gameStatus !== EGameStatus.DEFAULT) {
      location.reload();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white',
      }}
    >
      {gameStatus === EGameStatus.DEFAULT && (
        <>
          <p style={{ fontSize: '28px' }}>SPACE INVADERS</p>
          <p style={{ margin: '48px 0 0 0' }}>SCORE ADVANCE TABLE</p>
          <PointLabel
            invaderType={EInvaderType.UFO}
            point={'?'}
            label={'MYSTERY'}
          />
          <PointLabel
            invaderType={EInvaderType.OCTOPUS}
            point={'20'}
            label={'POINTS'}
          />
          <PointLabel
            invaderType={EInvaderType.CRAB}
            point={'10'}
            label={'POINTS'}
          />
          <p style={{ margin: '48px 0 0 0' }}>PRESS "SPACE" TO START</p>
        </>
      )}
      {gameStatus === EGameStatus.GAME_OVER && (
        <>
          <p style={{ fontSize: '42px' }}>GAME OVER</p>
          <p style={{ margin: '48px 0 0 0' }}>PRESS "BACK SPACE" TO TITLE</p>
        </>
      )}
      {gameStatus === EGameStatus.GAME_CLEAR && (
        <>
          <p style={{ fontSize: '42px' }}>GAME CLEAR</p>
          <p style={{ margin: '48px 0 0 0' }}>PRESS "BACK SPACE" TO TITLE</p>
        </>
      )}
    </div>
  );
};
