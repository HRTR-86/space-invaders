import { IPropsBase } from '@/scripts/Common/System';
import { BatteryProvider } from '@/scripts/Provider/BatteryProvider';
import { BeamProvider } from '@/scripts/Provider/BeamProvider';
import { GameStatusProvider } from '@/scripts/Provider/GamaStatusProvider';
import { ImperativeProvider } from '@/scripts/Provider/ImperativeProvider';
import { InvaderProvider } from '@/scripts/Provider/InvaderProvider';
import { UfoProvider } from '@/scripts/Provider/UfoProvider';

interface IProps extends IPropsBase {}

export const AppProvider = ({ children }: IProps) => {
  return (
    <ImperativeProvider>
      <GameStatusProvider>
        <BatteryProvider>
          <BeamProvider>
            <UfoProvider>
              <InvaderProvider>{children}</InvaderProvider>
            </UfoProvider>
          </BeamProvider>
        </BatteryProvider>
      </GameStatusProvider>
    </ImperativeProvider>
  );
};
