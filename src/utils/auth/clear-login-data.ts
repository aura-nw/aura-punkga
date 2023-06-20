import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRED,
  WALLET_ADDRESS,
} from './helpers';

const onLogoutSuccess = () => {
  sessionStorage.removeItem(WALLET_ADDRESS);
  sessionStorage.removeItem(ACCESS_TOKEN);
  sessionStorage.removeItem(REFRESH_TOKEN);
  sessionStorage.removeItem(EXPIRED);
};

export const clearLoginData = () => {
  onLogoutSuccess();
}