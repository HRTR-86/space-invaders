/**
 * 命令の種類
 */
export const EImperative = {
  HAS_NOT_MESSAGE: 0,
  BEAM_HIT_INVADER: 1,
  MISSILE_HIT_BATTERY: 2,
  ALL_INVADER_DESTROYED: 3,
} as const;

export type TImperative = (typeof EImperative)[keyof typeof EImperative];
