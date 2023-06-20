import { ethers, providers } from 'ethers';
import erc20Abi from '../../abi/erc20.json';

export const getErc20Balance = async (
  tokenAddress: string,
  provider: providers.Web3Provider
) => {
  const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
  const walletAddress = await provider.getSigner().getAddress();
  return await contract.balanceOf(walletAddress);
};

export const transferErc20 = (
  tokenAddress: string,
  toAddress: string,
  amount: ethers.BigNumber,
  provider: providers.Web3Provider
) => {
  const contract = new ethers.Contract(
    tokenAddress,
    erc20Abi,
    provider.getSigner()
  );
  return contract.transfer(toAddress, amount);
};
