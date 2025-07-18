import { FC } from 'react';
import { IPropsBase } from '@/scripts/Common/System';

interface IProps extends IPropsBase {
  isOpen: boolean;
}

export const Visible: FC<IProps> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return <>{children}</>;
};
