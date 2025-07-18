/**
 * キーコード
 */
export const EKeyCode = {
  SPACE: 'Space',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
} as const;

export type TKeyCode = (typeof EKeyCode)[keyof typeof EKeyCode];
