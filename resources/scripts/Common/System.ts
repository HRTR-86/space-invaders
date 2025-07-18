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
