import { getAllMethodNames } from "./getAllMethodNames";

export const getAllPrototypeMethodNames = (obj: any): string[] => {
  return getAllMethodNames(Object.getPrototypeOf(obj)).filter(
    (property) => property !== "constructor"
  );
};
