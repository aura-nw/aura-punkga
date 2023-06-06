export function setLocalStorage(cookieName : string, cookieValue : string) {
  window.localStorage.setItem(cookieName, JSON.stringify(cookieValue));
}
export function getLocalStorage(cookieName : string) {
  const result = window.localStorage.getItem(cookieName);
  return JSON.parse(result || '');
}
export function deleteLocalStorage(cookieName : string) {
  window.localStorage.removeItem(cookieName);
  return true;
}
