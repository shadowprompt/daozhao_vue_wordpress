interface AxiosResponse {
  config: object;
  data: object | null;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  stateText: string;
}

/**
 *
 * @param res
 */
export const httpSuccess = (res: AxiosResponse) => res.status === 200;

/**
 *
 * @param time
 * @param format
 */
export const timeStampFormat = (time: string | number, format: string) => {
  if (!time) {
    return '';
  }
  const t: Date = new Date(+time);
  const tf = (i: number) => (i < 10 ? '0' : '') + i;
  return format.replace(
    /yyyy|MM|dd|HH|mm|ss/g,
    (a: string): string => {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
        case 'MM':
          return tf(t.getMonth() + 1);
        case 'mm':
          return tf(t.getMinutes());
        case 'dd':
          return tf(t.getDate());
        case 'HH':
          return tf(t.getHours());
        case 'ss':
          return tf(t.getSeconds());
        default:
          return time + '';
      }
    },
  );
};

export default {
  httpSuccess,
  timeStampFormat,
};
