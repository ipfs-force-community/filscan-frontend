import { useEffect, useState } from 'react';

const useHash = (): string => {
  const [hash, setHash] = useState<string>('');

  useEffect(() => {
    const showHash = window.location?.hash?.split('#')[1]||''
    setHash(showHash);

    const handleHashChange = () => {
      setHash(showHash);
    };

    window.addEventListener('hashchange', handleHashChange);

    // 在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return hash;
};

export default useHash;
