import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, interval = 30000) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function call() {
      savedCallback.current && savedCallback.current();
    }
    call();
    const intervalId = setInterval(call, interval);
    return () => clearInterval(intervalId);
  }, [interval]);
};
