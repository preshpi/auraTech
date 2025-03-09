/* eslint-disable @typescript-eslint/no-explicit-any */
export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
