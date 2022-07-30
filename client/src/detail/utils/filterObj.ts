/* eslint-disable no-param-reassign */
export const filterObjWithKey = <T, K extends keyof T>(obj: T, keys: (keyof T)[]): Omit<T, K> =>
  Object.keys(obj)
    .filter((key) => keys.includes(key as keyof T))
    .reduce((cur, key) => {
      cur[key as keyof Omit<T, K>] = obj[key as keyof Omit<T, K>];
      return cur;
    }, {} as Omit<T, K>);

export const filterObjValueWithKey = <T>(obj: T, key: string) =>
  Object.entries(obj)
    .map(([k, v]) => [k, v[key]])
    .reduce<any>((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});

export const createObjWithCertainValue = <T>(keys: string[], value: T) =>
  keys.reduce((acc, cur) => {
    acc[cur] = value;
    return acc;
  }, {} as { [key in string]: T });
