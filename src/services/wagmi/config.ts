import getConfig from 'next/config'
import { mainnet, sepolia } from 'viem/chains'
import { createConfig, http } from 'wagmi'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

export const getWagmiConfig = (projectId: string) => {
  const config = getConfig()
  const chainInfo = config.CHAIN_INFO
  return createConfig({
    chains: [
      mainnet,
      sepolia,
      {
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
      },
    ],
    connectors: [walletConnect({ showQrModal: false, projectId }), metaMask(), injected()],
    transports: {
      [chainInfo.evmChainId]: http(),
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}
