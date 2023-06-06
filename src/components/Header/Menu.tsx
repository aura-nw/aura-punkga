import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu as AntMenu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', 'dashboard'),
  getItem('Swap', 'swap'),
  getItem('Earn', 'earn', null, [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6')
    ])
  ]),
  getItem('Token', 'token', null, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10')
  ])
];

const Menu: React.FC = () => {
  const [current, setCurrent] = useState('dashboard');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <AntMenu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{ flex: 'auto', minWidth: 0 }}
    />
  );
};

export default Menu;
