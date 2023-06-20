export const getBaseLinkBscScan = () => document.location.hostname.endsWith(".dev")
  ? "https://testnet.bscscan.com/tx/"
  : "https://bscscan.com/tx/";

  export const getContractLinkBscScan = () => document.location.hostname.endsWith(".dev")
  ? "https://testnet.bscscan.com/address/"
  : "https://bscscan.com/address/";