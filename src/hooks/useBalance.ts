import { useSdk } from 'core/logic';
import { useCallback, useEffect, useState } from 'react';

export const useBalance = () => {
  const { getClient, address, initialized } = useSdk();
  const [balance, setBalance] = useState<any[]>([]);
  const [token, setToken] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTokenBalance = useCallback(
    (tokenInfo) => {
      const isNativeToken = !!tokenInfo.denom;

      if (isNativeToken) {
        return getClient().getBalance(address, tokenInfo.denom);
      }

      return getClient().queryContractSmart(tokenInfo.contractAddr, {
        balance: {
          address: address
        }
      });
    },
    [address, getClient]
  );

  useEffect(() => {
    if (!token.length || !initialized) return;

    const getData = async () => {
      setIsLoading(true);
      try {
        const rawTokensData = await Promise.all([
          getTokenBalance(token[0]),
          getTokenBalance(token[1])
        ]);

        const tokensBalance = rawTokensData.map((el) => {
          if (el?.amount) {
            return { balance: el.amount };
          }
          return el;
        });

        setBalance(tokensBalance);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };
    getData();
  }, [getTokenBalance, initialized, token]);

  return { isLoading, balance, setToken };
};
