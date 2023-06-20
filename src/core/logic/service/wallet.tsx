// import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Coin } from '@cosmjs/stargate';
import { OfflineSigner } from '@cosmjs/proto-signing';
import {
  QueryClient,
  StakingExtension,
  DistributionExtension
} from '@cosmjs/stargate';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { AppConfig } from '../config';
import { useError } from './error';
import { createClient, createStakingClient } from './sdk';
import { isAndroid, isIOS } from 'react-device-detect';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Config } from '../../../helpers';
import { useHistory, useLocation } from 'react-router-dom';
import { URLS } from 'constants/url';
import { isCoin98Browser } from '../../../helpers/wallet';

interface CosmWasmContextType {
  readonly initialized: boolean;
  readonly init: (signer: OfflineSigner) => void;
  readonly clear: () => void;
  readonly config: Partial<AppConfig>;
  readonly changeConfig: (updates: Partial<AppConfig>) => void;
  readonly address: string;
  readonly balance: readonly Coin[];
  readonly refreshBalance: () => Promise<void>;
  readonly getSigner: () => OfflineSigner;
  readonly changeSigner: (newSigner: OfflineSigner) => void;
  readonly getClient: () => any;
  readonly getStakingClient: () => QueryClient &
    StakingExtension &
    DistributionExtension;
}

function throwNotInitialized(): any {
  throw new Error('Not yet initialized');
}

const defaultContext: CosmWasmContextType = {
  initialized: false,
  init: throwNotInitialized,
  clear: throwNotInitialized,
  config: {},
  changeConfig: throwNotInitialized,
  address: '',
  balance: [],
  refreshBalance: throwNotInitialized,
  getSigner: throwNotInitialized,
  changeSigner: throwNotInitialized,
  getClient: throwNotInitialized,
  getStakingClient: throwNotInitialized
};

const CosmWasmContext =
  React.createContext<CosmWasmContextType>(defaultContext);

export const useSdk = (): CosmWasmContextType =>
  React.useContext(CosmWasmContext);

interface SdkProviderProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  readonly config: AppConfig;
}

export function SdkProvider({
  config: configProp,
  children
}: SdkProviderProps): JSX.Element {
  const { setError } = useError();

  const { pathname } = useLocation();
  const history = useHistory();
  const [config, setConfig] = useState(configProp);
  const [signer, setSigner] = useState<any>();
  const [client, setClient] = useState<any>();

  const init = (signer: any) => {
    setValue((value) => ({ ...value, initialized: false }));
    setSigner(signer);
  };
  const contextWithInit = { ...defaultContext, init };
  const [value, setValue] = useState<CosmWasmContextType>(contextWithInit);

  function clear(): void {
    setValue({ ...contextWithInit });
    setClient(undefined);
    setSigner(undefined);
    setConfig(configProp);
  }

  function changeConfig(updates: Partial<AppConfig>): void {
    setConfig((config) => ({ ...config, ...updates }));
  }

  // Get balance for each coin specified in config.coinMap
  async function refreshBalance(
    address: string,
    balance: Coin[]
  ): Promise<void> {
    if (!client) return;

    try {
      const newBalance: Coin[] = [];
      balance.length = 0;
      for (const denom in config.coinMap) {
        const coin = await client.getBalance(address, denom);
        if (coin) {
          balance.push(coin);
          newBalance.push(coin);
        }
      }

      setValue((v) => ({ ...v, balance: newBalance }));
    } catch {}
  }

  useEffect(() => {
    if (!signer) return;

    (async function updateClient(): Promise<void> {
      try {
        let client = null;
        if (!isCoin98Browser() && (isAndroid || isIOS)) {
          client = await SigningCosmWasmClient.connect(Config.chainInfo.rpcUrl);
        } else {
          client = await createClient(config, signer);
        }
        setClient(client);
      } catch (error: any) {
        setError(error.message);
      }
    })();
  }, [signer, config, setError]);

  useEffect(() => {
    if (!signer || !client) return;

    const balance: Coin[] = [];

    (async function updateValue(): Promise<void> {
      try {
        const address = (await signer.getAccounts())[0].address;

        await refreshBalance(address, balance);

        const stakingClient = await createStakingClient(config.rpcUrl);

        setValue({
          initialized: true,
          init: () => {},
          clear,
          config,
          changeConfig,
          address,
          balance,
          refreshBalance: refreshBalance.bind(null, address, balance),
          getSigner: () => signer,
          changeSigner: setSigner,
          getClient: () => client,
          getStakingClient: () => stakingClient
        });
      } catch (e) {
        console.error(e, pathname);
        if (pathname === URLS.ASSETS) {
          history.replace(URLS.SWAP);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, setValue]);

  return (
    <CosmWasmContext.Provider value={value}>
      {children}
    </CosmWasmContext.Provider>
  );
}
