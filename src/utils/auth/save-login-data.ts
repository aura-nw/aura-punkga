import {
  WALLET_ADDRESS,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRED,
} from './helpers';

type loggedInData = {
  walletAddress: string,
  access_token: string,
  refresh_token: string,
  expired: number
}

const saveToStorage = (data: loggedInData) => {
  sessionStorage.setItem(WALLET_ADDRESS, data.walletAddress);
  sessionStorage.setItem(ACCESS_TOKEN, data.access_token);
  sessionStorage.setItem(REFRESH_TOKEN, data.refresh_token);
  sessionStorage.setItem(EXPIRED, data.expired.toString());
};

export const saveLoginData = (data: loggedInData) => saveToStorage(data);
