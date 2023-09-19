/** @format */

import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback: any = useRef<() => void | null>();

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 设置 interval
  useEffect(() => {
    function tick() {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      tick();
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
