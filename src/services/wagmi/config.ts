import getConfig from 'next/config'
import { createConfig, http } from 'wagmi'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'
export const storyChain = {
  id: 1513,
  name: 'Story Iliad Network',
  nativeCurrency: {
    name: 'IP',
    symbol: 'IP',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://story-testnet.aura.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Storyscan',
      url: 'https://testnet.storyscan.xyz/',
      apiUrl: 'https://explorer-api.dev.aura.network/api',
    },
  },
}
export const getWagmiConfig = (projectId: string) => {
  const chainInfo = getConfig().CHAIN_INFO
  const auraChain = {
    id: chainInfo.evmChainId,
    name: chainInfo.chainName,
    nativeCurrency: {
      name: chainInfo.nativeCurrency.name,
      symbol: chainInfo.nativeCurrency.symbol,
      decimals: chainInfo.nativeCurrency.decimals,
    },
    rpcUrls: {
      default: {
        http: [chainInfo.rpc[1]],
      },
    },
    blockExplorers: {
      default: {
        name: 'Aurascan',
        url: chainInfo.explorer,
        apiUrl: chainInfo.indexerV2,
      },
    },
  }
  return createConfig({
    chains: [storyChain, auraChain],
    connectors: [walletConnect({ showQrModal: false, projectId }), metaMask(), injected()],
    transports: {
      [auraChain.id]: http(),
      [storyChain.id]: http(),
    },
  })
}
