export const setLocalStorage = <T>(key: string, item: T) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};
export const getLocalStorage = <T>(key: string): T | undefined => {
  const result = window.localStorage.getItem(key);
  if (!result) return undefined;

  try {
    return JSON.parse(result || '') as T;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
export const deleteLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
  return true;
};
