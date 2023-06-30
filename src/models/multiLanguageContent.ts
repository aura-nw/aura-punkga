import { LanguageType } from "src/constants/global.types";

export type IMultiLanguageContent<T> = {
  [key in LanguageType]: T;
};