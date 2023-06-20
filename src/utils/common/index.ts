import { isNil, either, isEmpty } from 'ramda';

export * from './formatAddress';
export * from './getAllMethodNames';
export * from './getAllPrototypeMethodNames';
export * from './removeEmptyProperties';
export * from './uploadFileToStorage';
export * from './toJson';
export * from './toText';
export * from './copy-to-clipboard';
export * from './getBaseLinkBscScan';
export * from './getUserWalletAddress';
export * from './props';

export const formatTwoDigits = (num: number) => {
  return num < 10 ? `0${num}` : num;
}