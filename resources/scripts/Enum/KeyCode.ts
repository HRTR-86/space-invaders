/**
 * キーコード
 */
export const EKeyCode = {
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  BACKSPACE: 'Backspace',
  SPACE: 'Space',
} as const;

export type TKeyCode = (typeof EKeyCode)[keyof typeof EKeyCode];
