import { Keplr, Key } from "@keplr-wallet/types"
import config from 'public/config.json'
export async function handleConnectWallet(keplr: Keplr, key: Key) {
  const timeStamp = new Date().getTime()
  const msg = `
    Welcome to Punkga!

    This message is only to authenticate yourself. Please sign to proceed with using Punkga.
    Signing this message will not trigger a blockchain transaction or cost any gas fees.
    To ensure your security, your authentication status will reset after you close the browser.

    Wallet address:
    ${key.bech32Address}

    Timestamp:
    ${timeStamp}`
  return await keplr.signArbitrary(config.CHAIN_ID, key.bech32Address, msg)
}
