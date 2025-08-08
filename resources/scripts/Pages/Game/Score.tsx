import { IPropsBase } from '@/scripts/Common/System';
import { useBatteryContext } from '@/scripts/Provider/BatteryProvider';
import { useGameStatusContext } from '@/scripts/Provider/GamaStatusProvider';

interface IProps extends IPropsBase {}

export const Score = (_: IProps) => {
  const { score } = useGameStatusContext();
  const { life } = useBatteryContext();

  return (
    <div
      style={{
        width: '100vw',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'fixed',
        top: '0px',
      }}
    >
      <div
        style={{
          color: 'white',
        }}
      >
        {`SCORE：${score}`}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        {Array.from({ length: life }, (_, index) => (
          <img
            key={index}
            style={{
              height: '21px',
              width: '30px',
              objectFit: 'cover',
            }}
            alt={'battery'}
            src={'/images/battery1.png'}
          />
        ))}
      </div>
    </div>
  );
};
