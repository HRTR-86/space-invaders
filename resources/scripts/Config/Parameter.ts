// インベーダーが左右に移動できる回数
export const MAX_MOVE_COUNT = 20;

// インベーダーが待機する時間
export const INVADER_SLEEP_TIME = 1000;

// 盤面のサイズ
export const BOARD_HEIGHT = 70;
export const BOARD_WIDTH = 97;

// インベーダーの初期位置
export const DEFAULT_INVADER_ROW_LIST = [7, 11];
export const DEFAULT_INVADER_COLUMN_LIST = [12, 18, 24, 30, 36, 42, 48, 54, 60, 66];

// インベーダーの数
export const DEFAULT_INVADER_COUNT =
  DEFAULT_INVADER_ROW_LIST.length * DEFAULT_INVADER_COLUMN_LIST.length;

// ミサイルが待機する時間
export const MISSILE_SLEEP_TIME = 25;
