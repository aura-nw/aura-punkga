export const getAllMethodNames = (obj: any): string[] => {
  return Object.getOwnPropertyNames(obj).filter(
    (property) => typeof obj[property] === "function"
  );
};
