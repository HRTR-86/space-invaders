import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { EImperative, TImperative } from '@/scripts/Enum/Imperative';

export const initialImperative = {
  message: EImperative.HAS_NOT_MESSAGE,
  payload: {},
};

interface Imperative {
  message: TImperative;
  payload?: object;
}

interface ImperativeContext {
  imperative: Imperative;
  setImperative: Dispatch<SetStateAction<Imperative>>;
}

interface IProps extends IPropsBase {}

const ImperativeContext = createContext<ImperativeContext>({
  imperative: { ...initialImperative },
  setImperative: () => {},
});

export const ImperativeProvider = ({ children }: IProps) => {
  const [imperative, setImperative] = useState<Imperative>({ ...initialImperative });

  return (
    <ImperativeContext.Provider value={{ imperative, setImperative }}>
      {children}
    </ImperativeContext.Provider>
  );
};

export const useImperativeContext = () => useContext(ImperativeContext);
