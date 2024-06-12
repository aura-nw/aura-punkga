import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

export const getWagmiConfig = (projectId:string) => {
  return createConfig({
    chains: [sepolia],
    connectors: [walletConnect({ showQrModal: false, projectId }), metaMask(), injected()],
    transports: {
      [sepolia.id]: http(),
    },
  })
}
