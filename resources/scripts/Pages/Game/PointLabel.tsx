import { IPropsBase } from '@/scripts/Common/System';
import { EInvaderType, TInvaderType } from '@/scripts/Enum/InvaderType';

interface IProps extends IPropsBase {
  invaderType: TInvaderType;
  point: string;
  label: string;
}

export const PointLabel = ({ invaderType, point, label }: IProps) => {
  /**
   * 画像のファイルパスを取得する
   */
  const getFilePath = (invaderType: TInvaderType): string => {
    if (invaderType === EInvaderType.CRAB) {
      return '/images/invader11.png';
    }

    if (invaderType === EInvaderType.OCTOPUS) {
      return '/images/invader21.png';
    }

    return '/images/ufo1.png';
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        margin: '16px 0 0 0',
      }}
    >
      <img
        style={{
          height: '28px',
          width: '40px',
          objectFit: 'contain',
        }}
        alt={'ufo'}
        src={getFilePath(invaderType)}
      />
      <p>=</p>
      <p style={{ width: '30px' }}>{point}</p>
      <p style={{ width: '100px' }}>{label}</p>
    </div>
  );
};
