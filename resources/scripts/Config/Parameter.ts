// インベーダーが左右に移動できる回数
export const MAX_MOVE_COUNT = 20;

// インベーダーが待機する時間
export const INVADER_SLEEP_TIME = 1000;

// 盤面のサイズ
export const BOARD_HEIGHT = 70;
export const BOARD_WIDTH = 97;

// インベーダーの初期位置
export const DEFAULT_OCTOPUS_INVADER_ROW_LIST = [11, 15];
export const DEFAULT_CRAB_INVADER_ROW_LIST = [19, 23];
export const DEFAULT_INVADER_COLUMN_LIST = [12, 18, 24, 30, 36, 42, 48, 54, 60, 66];

// インベーダーの数
export const DEFAULT_INVADER_COUNT =
  DEFAULT_OCTOPUS_INVADER_ROW_LIST.length * DEFAULT_INVADER_COLUMN_LIST.length +
  DEFAULT_CRAB_INVADER_ROW_LIST.length * DEFAULT_INVADER_COLUMN_LIST.length;

// ビームが待機する時間
export const BEAM_SLEEP_TIME = 5;

// ミサイルが待機する時間
export const MISSILE_SLEEP_TIME = 25;

// UFOが待機する時間
export const UFO_SLEEP_TIME = 30;

// UFOの初期位置
export const DEFAULT_UFO_COORDINATE = {
  X: 0,
  Y: 7,
};

// UFOの出現間隔
export const UFO_INTERVAL = 25000;

// 砲台のライフ
export const LIFE_COUNT = 2;
