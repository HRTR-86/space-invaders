import { IPropsBase } from '@/scripts/Common/System';
import { Visible } from '@/scripts/Component/Visible';

interface IProps extends IPropsBase {
  xCoordinate: number;
  yCoordinate: number;
  isDisplay: boolean;
}

export const Invader = ({ xCoordinate, yCoordinate, isDisplay }: IProps) => {
  return (
    <Visible isOpen={isDisplay}>
      <div
        style={{
          height: '20px',
          width: '40px',
          position: 'absolute',
          top: `calc(${xCoordinate * 10}px - 10px)`,
          left: `calc(${yCoordinate * 10}px - 20px)`,
          backgroundColor: yCoordinate % 2 ? 'red' : 'black',
        }}
      />
    </Visible>
  );
};
