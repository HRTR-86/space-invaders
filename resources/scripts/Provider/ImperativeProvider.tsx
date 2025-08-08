import { createContext, useContext, useState } from 'react';
import { IPropsBase } from '@/scripts/Common/System';
import { TImperative } from '@/scripts/Enum/Imperative';

interface Imperative {
  message: TImperative;
  payload?: object;
}

interface ImperativeContext {
  imperativeList: Imperative[];
  handleAddImperative: (imperative: Imperative) => void;
}

interface IProps extends IPropsBase {}

const ImperativeContext = createContext<ImperativeContext>({
  imperativeList: [],
  handleAddImperative: () => {},
});

export const ImperativeProvider = ({ children }: IProps) => {
  const [imperativeList, setImperativeList] = useState<Imperative[]>([]);

  /**
   * 命令を追加する
   */
  const handleAddImperative = (newImperative: Imperative) => {
    setImperativeList((currentImperativeList) => [...currentImperativeList, newImperative]);
  };

  return (
    <ImperativeContext.Provider value={{ imperativeList, handleAddImperative }}>
      {children}
    </ImperativeContext.Provider>
  );
};

export const useImperativeContext = () => useContext(ImperativeContext);
