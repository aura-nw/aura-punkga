import getConfig from 'next/config'
import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

export const getWagmiConfig = () => {
  const projectId = getConfig().WALLET_CONNECT_PROJECT_ID
  return createConfig({
    chains: [sepolia],
    connectors: [walletConnect({ showQrModal: false, projectId }), metaMask(), injected()],
    transports: {
      [sepolia.id]: http(),
    },
  })
}
