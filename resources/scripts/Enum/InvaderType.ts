/**
 * インベーダーの種類
 */
export const EInvaderType = {
  DEFAULT: 0,
  OCTOPUS: 1,
  OCTOPUS_DESTROYED: 2,
  CRAB: 3,
  CRAB_DESTROYED: 4,
  UFO: 5,
} as const;

export type TInvaderType = (typeof EInvaderType)[keyof typeof EInvaderType];
