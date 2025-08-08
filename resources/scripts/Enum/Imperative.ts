/**
 * 命令の種類
 */
export const EImperative = {
  HAS_NOT_MESSAGE: 0,
  INITIALIZE_SETTINGS: 1,
  BEAM_HIT_INVADER: 2,
  BEAM_HIT_UFO: 3,
  MISSILE_HIT_BATTERY: 4,
  ALL_INVADER_DESTROYED: 5,
  ALL_BATTERY_DESTROYED: 6,
  INVADER_REACHED_EDGE: 7,
} as const;

export type TImperative = (typeof EImperative)[keyof typeof EImperative];
