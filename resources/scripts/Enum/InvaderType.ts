/**
 * インベーダーの種類
 */
export const EInvaderType = {
  DEFAULT: 0,
  OCTOPUS: 1,
  CRAB: 2,
  UFO: 3,
} as const;

export type TInvaderType = (typeof EInvaderType)[keyof typeof EInvaderType];
