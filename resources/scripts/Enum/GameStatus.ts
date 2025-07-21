/**
 * ゲームの状態
 */
export const EGameStatus = {
  DEFAULT: 0,
  PLAYING: 1,
  GAME_OVER: 2,
  GAME_CLEAR: 3,
} as const;

export type TGameStatus = (typeof EGameStatus)[keyof typeof EGameStatus];
