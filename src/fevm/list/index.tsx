/** @format */

import { useHash } from '@/components/hooks/useHash';
import Segmented from '@/packages/segmented';
import Selects from '@/packages/selects';
import { useMemo } from 'react';
import useUpdateQuery from '@/components/hooks/useUpdateQuery';
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery';
import Transfer from './Transfer';
import Owner from './Owner';
import Dex from './Dex';

export default ({
  id,
  tabList,
  defaultActive,
  type,
}: {
  id?: string | string[];
  type: string;
  tabList: Array<any>;
  defaultActive: string;
}) => {
  const updateQuery = useUpdateQuery();
  const removeQueryParam = useRemoveQueryParam();
  const { hash, hashParams } = useHash();
  const { p } = hashParams || {};

  const activeTab = useMemo(() => {
    if (hash) {
      return hash;
    }
    return defaultActive;
  }, [defaultActive, hash]);

  return (
    <div className='mt-5'>
      <Segmented
        data={tabList || []}
        ns='contract'
        defaultValue={activeTab}
        defaultActive={defaultActive}
        isHash={true}
      />
      <div className='min-h-[200px] mt-2.5'>
        {activeTab === 'transfer' && <Transfer id={id} type={ type} />}
        {activeTab === 'owner' && <Owner id={id} />}
        {activeTab === 'dex' && <Dex id={id} />}
      </div>
    </div>
  );
};
