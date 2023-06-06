import { Divider, Typography } from 'antd';
import React, { useState } from 'react';
import { FormSearchName } from './components/FormSearchName';

import { printableBalance, useSdk } from '../../core/logic';
import { TokenList } from './components/TokenList';
import { Card } from 'components';

const { Title } = Typography;

export const Tokens: React.FC = () => {
  const { address, balance, config } = useSdk();
  const [currentAddress, setCurrentAddress] = useState(address);

  return (
    <div>
      <Card style={{ width: 600 }}>
        <Title level={2}>Your Account</Title>
        <Title level={5}>Chain name : {config.chainName}</Title>
        <Title level={5}>Address : {address}</Title>
        <Title level={5}>Balance : {printableBalance(balance)}</Title>
      </Card>

      <Divider />
      <Card style={{ width: 600 }}>
        <Title level={2}>Search contract address</Title>
        <FormSearchName
          currentAddress={currentAddress}
          setCurrentAddress={setCurrentAddress}
        />
        <TokenList currentAddress={currentAddress} />
      </Card>
    </div>
  );
};
