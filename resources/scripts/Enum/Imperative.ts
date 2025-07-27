/**
 * 命令の種類
 */
export const EImperative = {
  HAS_NOT_MESSAGE: 0,
  BEAM_HIT_INVADER: 1,
  BEAM_HIT_UFO: 2,
  MISSILE_HIT_BATTERY: 3,
  ALL_INVADER_DESTROYED: 4,
} as const;

export type TImperative = (typeof EImperative)[keyof typeof EImperative];
