import React, { useState } from 'react';

import { Button, Space, Typography } from 'antd';
import {
  configKeplr,
  loadKeplrWallet,
  useError,
  useSdk,
  WalletLoader
} from '../../core/logic';

import { config } from '../../config';

const { Text } = Typography;

export const ConnectWallet: React.FC = () => {
  const { initialized, address } = useSdk();
  const { error, setError, clearError } = useError();
  const sdk = useSdk();

  const [initializing, setInitializing] = useState(false);

  async function init(loadWallet: WalletLoader) {
    setInitializing(true);
    clearError();

    try {
      const signer = await loadWallet(config.chainId, config.addressPrefix);
      sdk.init(signer);
      setInitializing(false);
    } catch (error) {
      console.error(error);
      setError(Error(error as any).message);
      setInitializing(false);
    }
  }

  function checkExistedCoin98() {
    const anyWindow: any = window;
    if (anyWindow.coin98) {
      if (anyWindow.coin98.keplr) {
        return anyWindow.coin98.keplr;
      } else {
        return undefined; // c98 not override keplr
      }
    }

    return null; // not found coin98
  }

  function getKeplr() {
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
  }

  async function initKeplr() {
    try {
      const keplr = await getKeplr();

      if (keplr) {
        await keplr.experimentalSuggestChain(configKeplr(config));
        await keplr.enable(config.chainId);
        await init(loadKeplrWallet);
      } else {
        window.open(
          'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en'
        );
      }
    } catch (error) {
      console.error(error);
      setError(Error(error as any).message);
    }
  }

  async function initCoin98() {
    const coin98 = checkExistedCoin98();
    if (coin98) {
      try {
        await coin98.experimentalSuggestChain(configKeplr(config));
        await coin98.enable(config.chainId);
        await init(loadKeplrWallet);
      } catch (error) {
        console.error(error);
        setError(Error(error as any).message);
      }
    } else {
      window.open(
        'https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg'
      );
    }
  }

  if (error) {
    console.log(error);
  }

  return initializing ? (
    <div>Initializing app...</div>
  ) : (
    <>
      {!initialized ? (
        <div>
          <Space>
            <Button type="primary" onClick={initCoin98}>
              Connect Coin98
            </Button>
            <Button type="primary" onClick={initKeplr}>
              Connect Keplr
            </Button>
          </Space>
        </div>
      ) : (
        <Text>{address}</Text>
      )}
    </>
  );
};
