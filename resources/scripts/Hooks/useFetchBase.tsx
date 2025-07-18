import { useState } from 'react';
import axios, { AxiosError, Method } from 'axios';
import { StatusCode } from '@/scripts/Enum/StatusCode';

export interface IOption<U> {
  onSuccess?: (data: U | null) => void;
  onError?: (error: AxiosError | any) => void;
}

export const useFetchBase = <T extends object, U extends object>(
  optionOld?: IOption<U>,
): {
  loading: boolean;
  data: U | null;
  fetchBase: (method: Method, url: string, parameter: T, option?: IOption<U>) => Promise<void>;
} => {
  const [data, setData] = useState<U | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBase = async (
    method: Method,
    url: string,
    parameter: T,
    option?: IOption<U>,
  ): Promise<void> => {
    try {
      setLoading(true);

      const data =
        method === 'GET'
          ? {
              params: parameter,
            }
          : {
              data: parameter,
            };

      const response = await axios({
        method: method,
        url: url,
        ...data,
      });

      setData(response.data);

      if (option?.onSuccess) {
        option.onSuccess(response.data);
      }

      if (optionOld?.onSuccess) {
        optionOld.onSuccess(response.data);
      }
    } catch (error: AxiosError | any) {
      if (error.status === StatusCode.UNPROCESSABLE_ENTITY) {
        if (optionOld?.onError === undefined) {
          return;
        }
        optionOld.onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, fetchBase };
};
