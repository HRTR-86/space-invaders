import { IPropsBase } from '@/scripts/Common/System';
import { useBatteryContext } from '@/scripts/Provider/BatteryProvider';
import { useInvaderContext } from '@/scripts/Provider/InvaderProvider';

interface IProps extends IPropsBase {}

export const Score = (_: IProps) => {
  const { destroyedInvaderCount } = useInvaderContext();
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
        {`Score：${destroyedInvaderCount * 10}`}
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
