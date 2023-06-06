import { Coin } from '@cosmjs/stargate';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { nativeCoinToDisplay, useSdk } from '../../../../core/logic';

const { Text } = Typography;

interface TokenListProps {
  readonly currentAddress: string;
}

export const TokenList: React.FC<TokenListProps> = ({ currentAddress }) => {
  const { config, getClient, address, balance: userBalance } = useSdk();
  const amAllowed = address === currentAddress;
  const [currentBalance, setCurrentBalance] = useState<readonly Coin[]>([]);

  useEffect(() => {
    if (amAllowed) {
      setCurrentBalance(userBalance);
    } else {
      setCurrentBalance([]);
      (async function updateCurrentBalance() {
        for (const denom in config.coinMap) {
          try {
            const coin = await getClient().getBalance(currentAddress, denom);
            if (coin) setCurrentBalance((prev) => [...prev, coin]);
          } catch (error) {
            console.error(error);
          }
        }
      })();
    }
  }, [amAllowed, userBalance, currentAddress, config.coinMap, getClient]);

  return (
    <div>
      {currentBalance.map((nativeToken) => {
        const { denom: denomToDisplay, amount: amountToDisplay } =
          nativeCoinToDisplay(nativeToken, config.coinMap!);

        return (
          <div
            key={nativeToken.denom}
            data-state={amAllowed ? '' : 'forbidden'}
            onClick={() => {}}
          >
            <div>
              <Text>Search result : {denomToDisplay} -</Text>
              <Text>
                {amountToDisplay !== '0' ? amountToDisplay : 'No tokens'}
              </Text>
            </div>
          </div>
        );
      })}
    </div>
  );
};
