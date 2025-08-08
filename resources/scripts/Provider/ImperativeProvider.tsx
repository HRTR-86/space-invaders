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
  imperativeList: Imperative[];
  handleAddImperative: (imperative: Imperative) => void;
}

interface IProps extends IPropsBase {}

const ImperativeContext = createContext<ImperativeContext>({
  imperative: { ...initialImperative },
  setImperative: () => {},
  imperativeList: [],
  handleAddImperative: () => {},
});

export const ImperativeProvider = ({ children }: IProps) => {
  const [imperative, setImperative] = useState<Imperative>({ ...initialImperative });
  const [imperativeList, setImperativeList] = useState<Imperative[]>([]);

  const handleAddImperative = (newImperative: Imperative) => {
    setImperativeList((currentImperativeList) => [...currentImperativeList, newImperative]);
  };

  return (
    <ImperativeContext.Provider
      value={{ imperative, setImperative, imperativeList, handleAddImperative }}
    >
      {children}
    </ImperativeContext.Provider>
  );
};

export const useImperativeContext = () => useContext(ImperativeContext);
