import { values } from "ramda";

export const DistributedNetworks = {
  BNB_CHAIN: 'bnb_chain',
  ETHEREUM: 'ethereum',
  POLYGON: 'polygon',
  SOLANA: 'solana',
  OPTIMISM: 'optimism',
};

export const getUserWalletAddress = (data: any = {}, distributedNetwork: string = '') => {
  if (!!data[distributedNetwork]) return data[distributedNetwork]

  for (const netWork of values(DistributedNetworks)) {
    if (!data[netWork]) continue
    return data[netWork]
  }
}