/** @format */

import { useHash } from '@/components/hooks/useHash';
import Segmented from '@/packages/segmented';
import Selects from '@/packages/selects';
import { HTMLAttributes, useMemo } from 'react';
import useUpdateQuery from '@/components/hooks/useUpdateQuery';
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery';
import Transfer from './Transfer';
import Owner from './Owner';
import Dex from './Dex';
import classNames from 'classnames';

interface ListProps extends HTMLAttributes<HTMLDivElement>{
  ids?: string | string[];
  type: string;
  tabList: Array<any>;
  defaultActive: string;
}

export default (props:ListProps) => {
  const {
    ids,
    tabList,
    defaultActive,
    type,
  } = props;
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
    <div className={`${classNames(props.className)} mt-5 relative`}>
      <Segmented
        data={tabList || []}
        ns='contract'
        defaultValue={activeTab}
        defaultActive={defaultActive}
        isHash={true}
      />
      <div className='min-h-[300px] pt-2.5'>
        {activeTab === 'transfer' && <Transfer id={ids} type={ type} />}
        {activeTab === 'owner' && <Owner id={ids} type={ type} />}
        {activeTab === 'dex' && <Dex id={ids} />}
      </div>
    </div>
  );
};
