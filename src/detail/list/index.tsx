/** @format */

import { useHash } from '@/components/hooks/useHash';
import Segmented from '@/packages/segmented';
import Selects from '@/packages/selects';
import { useEffect, useMemo, useState } from 'react';
import MessageList from './messageList';
import BlockList from './blockList';
import useUpdateQuery from '@/components/hooks/useUpdateQuery';
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery';
import TracesList from './tracesList';
import classNames from 'classnames';
import styles from './index.module.scss'
import EventLog from './EventLog';
import Verify from './verify';
import TokenList from './TokenList';
import { Translation } from '@/components/hooks/Translation';

export default ({
  accountId,
  tabList,
  defaultActive,
  actorId,
  verifyData
}: {
  accountId?: string | string[];
  tabList: Array<any>;
  defaultActive: string;
  actorId?: string;
  verifyData?:Record<string,any>
  }) => {
  const { tr } = Translation({ ns: 'detail' });
  const updateQuery = useUpdateQuery();
  const removeQueryParam = useRemoveQueryParam();
  const { hash, hashParams } = useHash();
  const [activeTab,setActiveTab] = useState(defaultActive);
  const { name, p } = hashParams || {};
  const [total,setTotal] = useState(0)

  useEffect(() => {
    if (hash) {
      if (tabList.find((v) => v.dataIndex === hash)) {
        setActiveTab(hash)
      } else {
        setActiveTab(defaultActive)
      }
    } else {
      setActiveTab(defaultActive)
    }
  },[tabList,hash,defaultActive])

  const method = useMemo(() => {
    if (name && typeof name === 'string') {
      return name;
    }
    return 'all';
  }, [name]);

  const activeItem = useMemo(() => {
    return tabList.find((v) => v.dataIndex === activeTab);
  }, [activeTab, tabList]);

  const headerOptions = useMemo(() => {
    if (activeItem?.headerOptions) {
      return activeItem?.headerOptions?.map((v: any) => {
        return { ...v, label: tr(v.dataIndex ||v.value) }
      })
    }
    return []
  }, [activeItem, tr]);

  return (
    <div className={classNames(styles.list,'mt-5')}>
      <div className={classNames(styles['list-header'],'flex justify-between items-center mr-2.5')}>
        <Segmented
          data={tabList || []}
          ns='detail'
          defaultValue={activeTab}
          defaultActive={ defaultActive}
          isHash={true}
        />
        {activeItem?.headerOptions && (
          <Selects
            className={`${styles['select-wrap']} !min-w-[210px]`}
            value={method}
            options={headerOptions || []}
            onChange={(value) => {
              if (value !== 'all') {
                updateQuery({ name: value });
              } else {
                removeQueryParam('name');
              }
            }}
          />
        )}
      </div>
      <div className='relative'>

        <div className={classNames('card_shadow p-5 mt-7 min-h-[300px] border border_color rounded-xl', styles.table, styles.reset)}>
          {activeTab === 'message_list' && (
            <MessageList accountId={accountId} methodName={method} />
          )}
          {activeTab === 'block_list' && <BlockList accountId={accountId} />}
          {activeTab === 'traces_list' && (
            <TracesList accountId={accountId} methodName={method} />
          )}
          {activeTab === 'ercList' && (
            <TokenList accountId={accountId} />
          )}
          {activeTab === 'contract_verify' && (
            <Verify actorId={actorId} verifyData={verifyData } />
          )}
          {activeTab === 'event_log' && (
            <EventLog actorId={actorId}/>
          )}
        </div>

      </div>

    </div>
  );
};

//table