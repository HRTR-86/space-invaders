import { ReactNode } from 'react';

export interface IPropsBase {
  sx?: ISx;
  children?: ReactNode;
  className?: string;
  loading?: boolean;
}

interface ISx {
  [key: string]: string;
}

/**
 * 指定した時間の間処理を停止する
 */
export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
