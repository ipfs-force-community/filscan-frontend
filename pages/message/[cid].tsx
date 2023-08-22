/** @format */
import { useRouter } from 'next/router';
import Message from '@/src/message';
import { useMemo } from 'react';

export default () => {
  const router = useRouter();

  const cid = useMemo(() => {
    const newCid = router.query?.cid || '';
    return newCid;
  }, [router.query]);

  return <Message cid={cid || ''} />;
};
