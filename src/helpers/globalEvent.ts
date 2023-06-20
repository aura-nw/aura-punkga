import { GlobalEventName } from 'constants/global.types';

const dispatchEvent = <T = any>(e: GlobalEvent<T>) => {
  window.dispatchEvent(new CustomEvent(e.name, { detail: e.data }));
};

const listenEvent = <T = any>(
  name: GlobalEventName,
  handler: GlobalHandler<T>
) => {
  const _handler = (e: CustomEvent) => {
    handler(e.detail);
  };

  window.addEventListener(name, _handler as any);

  const destroy = () => {
    window.removeEventListener(name, _handler as any);
  };

  return destroy;
};

const walletConnectedEvent = (chainId: string): GlobalEvent<string> => {
  return {
    name: GlobalEventName.ON_CONNECTED_WALLET,
    data: chainId
  };
};

const depositConfirmation = (txHash: string): GlobalEvent<string> => {
  return {
    name: GlobalEventName.ON_DEPOSIT_CONFIRMATION,
    data: txHash
  };
};

const depositComplete = (txHash: string): GlobalEvent<string> => {
  return {
    name: GlobalEventName.ON_DEPOSIT_COMPLETED,
    data: txHash
  };
};

const GlobalEvent = {
  dispatchEvent,
  listenEvent,

  walletConnectedEvent,
  depositConfirmation,
  depositComplete
};

export default GlobalEvent;
