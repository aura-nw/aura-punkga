import React, { useState } from 'react';
// import { Wallet } from '../Wallet';

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    keplr: any;
    getOfflineSigner: any;
  }
}

export const Header = ({}) => {
  return (
    <header>
      <div></div>
      {/* <Wallet /> */}
    </header>
  );
};
