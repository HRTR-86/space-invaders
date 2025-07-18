import { IPropsBase } from '@/scripts/Common/System';
import { BatteryProvider } from '@/scripts/Provider/BatteryProvider';
import { BeamProvider } from '@/scripts/Provider/BeamProvider';
import { ImperativeProvider } from '@/scripts/Provider/ImperativeProvider';
import { InvaderProvider } from '@/scripts/Provider/InvaderProvider';

interface IProps extends IPropsBase {}

export const AppProvider = ({ children }: IProps) => {
  return (
    <ImperativeProvider>
      <BatteryProvider>
        <BeamProvider>
          <InvaderProvider>{children}</InvaderProvider>
        </BeamProvider>
      </BatteryProvider>
    </ImperativeProvider>
  );
};
