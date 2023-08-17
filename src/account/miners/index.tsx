/** @format */

import { useHash } from '@/components/hooks/useHash';
import MinerAdd from './Add';

export default () => {
  const { searchParams } = useHash();
  const { type } = searchParams || {};

  if (type === 'miner_add') {
    return <MinerAdd />;
  }

  return <div>dgtrt</div>;
};
