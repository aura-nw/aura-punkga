import { isEmpty } from 'ramda';

export const removeEmptyProperties = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (!isEmpty(obj[key])) return;
    delete obj[key];
  });
  return obj;
};
