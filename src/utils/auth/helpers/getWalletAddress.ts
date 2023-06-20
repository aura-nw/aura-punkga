import { WALLET_ADDRESS } from "./keys";

export const getWalletAddress = () => sessionStorage.getItem(WALLET_ADDRESS) || "";
