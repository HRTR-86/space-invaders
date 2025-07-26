import { IPropsBase } from '@/scripts/Common/System';
import { Visible } from '@/scripts/Component/Visible';
import { EInvaderType, TInvaderType } from '@/scripts/Enum/InvaderType';

interface IProps extends IPropsBase {
  xCoordinate: number;
  yCoordinate: number;
  invader: TInvaderType;
}

export const Invader = ({ xCoordinate, yCoordinate, invader }: IProps) => {
  const getFilePath = (invaderType: TInvaderType, yCoordinate: number): string => {
    switch (invaderType) {
      case EInvaderType.CRAB:
        return `/images/invader1${yCoordinate % 2 === 0 ? '1' : '2'}.png`;
      case EInvaderType.OCTOPUS:
        return `/images/invader2${yCoordinate % 2 === 0 ? '1' : '2'}.png`;
      default:
        return '';
    }
  };

  return (
    <Visible isOpen={invader !== EInvaderType.DEFAULT}>
      <img
        style={{
          height: '32px',
          width: '40px',
          position: 'absolute',
          top: `calc(${xCoordinate * 10}px - 16px)`,
          left: `calc(${yCoordinate * 10}px - 20px)`,
          objectFit: 'cover',
        }}
        alt={'invader'}
        src={getFilePath(invader, yCoordinate)}
      />
    </Visible>
  );
};
