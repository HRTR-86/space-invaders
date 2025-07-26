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
        height: '20px',
        position: 'absolute',
        top: `0px`,
        right: `0px`,
        color: 'white',
      }}
    >
      {`Score：${destroyedInvaderCount * 10} / ${life}`}
    </div>
  );
};
