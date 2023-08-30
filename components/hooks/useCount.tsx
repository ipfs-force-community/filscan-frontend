import { useState, useEffect } from 'react';

// 自定义hook
export function useCountdown(initialCount: number) {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [count]);

  const resetCountdown = (newCount: number) => {
    setCount(newCount);
  };

  return { count, resetCountdown };
}
