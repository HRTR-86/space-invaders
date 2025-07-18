/**
 * インベーダーの進行方向
 */
export const EDirection = {
  RIGHT: 'right',
  LEFT: 'left',
} as const;

export type TDirection = (typeof EDirection)[keyof typeof EDirection];
