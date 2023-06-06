import { CosmWasmFeeTable } from '@cosmjs/cosmwasm-stargate';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import {
  defaultGasLimits as defaultStargateGasLimits,
  GasLimits,
  GasPrice
} from '@cosmjs/stargate';
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

export type WalletLoader = (
  chainId: string,
  addressPrefix?: string
) => Promise<OfflineSigner>;

export async function loadKeplrWallet(chainId: string): Promise<OfflineSigner> {
  const anyWindow: any = window;
  if (!anyWindow.getOfflineSigner) {
    throw new Error('Keplr extension is not available');
  }

  const signer = anyWindow.getOfflineSigner(chainId);
  signer.signAmino = signer.signAmino ?? signer.sign;

  return Promise.resolve(signer);
}

// this creates a new connection to a server at URL,
// using a signing keyring generated from the given mnemonic
export async function createClient(
  config: AppConfig,
  signer: OfflineSigner
): Promise<SigningCosmWasmClient> {
  const gasLimits: GasLimits<CosmWasmFeeTable> = {
    ...defaultStargateGasLimits,
    upload: 1500000,
    init: 600000,
    exec: 400000,
    migrate: 600000,
    send: 80000,
    changeAdmin: 80000
  };

  return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer, {
    prefix: config.addressPrefix,
    gasPrice: GasPrice.fromString(`${config.gasPrice}${config.feeToken}`),
    gasLimits: gasLimits
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
