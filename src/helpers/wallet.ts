import { isAndroid, isIOS } from 'react-device-detect';
import { WalletStorage } from '../components/Wallet/type';
import {
  LAST_USED_PROVIDER,
  WALLET_PROVIDER
} from '../constants/wallet.constant';
import { deleteLocalStorage, getLocalStorage } from './localStorage';

const getCoin98Keplr = () => {
  const anyWindow: any = window;
  if (anyWindow.coin98) {
    if (anyWindow.coin98.keplr) {
      return anyWindow.coin98.keplr;
    } else {
      return undefined; // c98 not override keplr
    }
  }

  return null; // not found coin98
};

const getKeplr = () => {
  const anyWindow: any = window;
  if (anyWindow.keplr) {
    return anyWindow.keplr;
  }

  if (document.readyState === 'complete') {
    return anyWindow.keplr;
  }

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === 'complete'
      ) {
        resolve(anyWindow.keplr);
        document.removeEventListener('readystatechange', documentStateChange);
      }
    };

    document.addEventListener('readystatechange', documentStateChange);
  });
};

export const getProvider = async (
  provider: WALLET_PROVIDER,
  firstLoad = false
) => {
  let keplr = null;
  const lastProvider = getLocalStorage<WalletStorage>(LAST_USED_PROVIDER);
  if (provider === WALLET_PROVIDER.COIN98) {
    keplr = getCoin98Keplr();
  } else {
    keplr = await getKeplr();
  }
  if (!keplr) {
    if (isAndroid || isIOS) {
      return null;
    }
    if (lastProvider) {
      deleteLocalStorage(LAST_USED_PROVIDER);
    }
    if (!firstLoad) {
      if (provider === WALLET_PROVIDER.COIN98) {
        window.open(
          'https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg'
        );
        return null;
      } else {
        window.open(
          'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en'
        );
        return null;
      }
    }
  }

  return keplr;
};

export const isCoin98Browser = () => (window as any)?.coin98?.isMobile;
