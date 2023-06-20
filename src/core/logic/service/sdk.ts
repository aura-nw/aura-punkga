import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import { OfflineSigner } from '@cosmjs/proto-signing';
import {
  DistributionExtension,
  QueryClient,
  setupDistributionExtension,
  setupStakingExtension,
  StakingExtension
} from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { AppConfig } from '../config';
import { Client } from '@coin98-com/connect-sdk';
import { isCoin98Browser } from '../../../helpers/wallet';

export type WalletLoader = (chainId: string, client?: Client) => Promise<any>;

export const loadKeplrWallet: WalletLoader = async (chainId) => {
  const anyWindow: any = window;
  if (!anyWindow.getOfflineSigner) {
    throw new Error('Keplr extension is not available');
  }

  const signer = anyWindow.getOfflineSigner(chainId);
  signer.signAmino = signer.signAmino ?? signer.sign;

  return Promise.resolve(signer);
};

export const loadCoin98MobileWallet: WalletLoader = (
  chainId,
  client?: Client
) => {
  if (!client?.getOfflineSigner) {
    throw new Error('Coin98 app is not available');
  }

  const signer = client.getOfflineSigner(chainId);

  signer.signAmino = signer.signAmino ?? signer.sign;
  return Promise.resolve(signer as any);
};

export const loadCoin98Wallet: WalletLoader = (chainId) => {
  const anyWindow: any = window;

  if (isCoin98Browser()) {
    const signer = anyWindow.coin98.keplr.getOfflineSigner(chainId);
    signer.signAmino = signer.signAmino ?? signer.sign;
    return Promise.resolve(signer);
  }

  if (!anyWindow.coin98.getOfflineSigner) {
    throw new Error('Coin98 extension is not available');
  }

  const signer = anyWindow.coin98.getOfflineSigner(chainId);
  signer.signAmino = signer.signAmino ?? signer.sign;

  return Promise.resolve(signer);
};

// this creates a new connection to a server at URL,
// using a signing keyring generated from the given mnemonic
export async function createClient(
  config: AppConfig,
  signer: any
): Promise<any> {
  return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer, {
    prefix: config.addressPrefix,
    gasPrice: GasPrice.fromString(`${config.gasPrice}${config.feeToken}`)
  });
}
export async function createClientFromRpc(
  rpcUrl: string,
  addressPrefix: string,
  signer: OfflineSigner
): Promise<SigningCosmWasmClient> {
  return SigningCosmWasmClient.connectWithSigner(rpcUrl, signer, {
    prefix: addressPrefix
  });
}

export async function createStakingClient(
  apiUrl: string
): Promise<QueryClient & StakingExtension & DistributionExtension> {
  const tmClient = await Tendermint34Client.connect(apiUrl);
  return QueryClient.withExtensions(
    tmClient,
    setupStakingExtension,
    setupDistributionExtension
  );
}
