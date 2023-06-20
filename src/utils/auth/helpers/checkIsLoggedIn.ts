
import { isNotEmpty } from "../../is-not-empty";
import { getAccessToken } from "./getAccessToken";

export const checkIsLoggedIn = () => {
  const accessToken = getAccessToken();
  
  return isNotEmpty(accessToken)
};
