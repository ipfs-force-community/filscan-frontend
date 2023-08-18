/** @format */

import MinerAdd from './Add';
import { useHash } from '@/components/hooks/useHash';

import { useEffect } from 'react';

export default () => {
  const { hashParams } = useHash();
  const { type } = hashParams || {};

  console.log('---3', hashParams);

  if (type === 'miner_add') {
    return <MinerAdd />;
  }

  return <div>dgtrt</div>;
};
