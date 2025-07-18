import dayjs, { OpUnitType, QUnitType } from 'dayjs';

export const useDateFormatter = () => {
  /**
   * 日付をフォーマットする
   */
  const formatDate = (dateTime: string, template: string = 'YYYY/MM/DD HH:mm'): string => {
    const date = dayjs(dateTime);
    if (!date.isValid()) {
      return '';
    }

    return date.format(template);
  };

  /**
   * 日時の差分を計算する
   */
  const calcDiff = (
    from?: dayjs.ConfigType,
    to?: dayjs.ConfigType,
    unit: QUnitType | OpUnitType = 'days',
  ) => {
    const fromDate = dayjs(from);
    const toDate = dayjs(to);

    if (!fromDate.isValid() || !toDate.isValid()) {
      return 0;
    }

    return toDate.diff(fromDate, unit);
  };

  return {
    calcDiff,
    formatDate,
  };
};
