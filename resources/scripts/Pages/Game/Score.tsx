import { IPropsBase } from '@/scripts/Common/System';
import { useInvaderContext } from '@/scripts/Provider/InvaderProvider';

interface IProps extends IPropsBase {}

export const Score = (_: IProps) => {
  const { destroyedInvaderCount } = useInvaderContext();

  return (
    <div
      style={{
        height: '20px',
        // width: '400px',
        position: 'absolute',
        top: `0px`,
        right: `0px`,
      }}
    >
      {`Score：${destroyedInvaderCount * 10}`}
    </div>
  );
};
