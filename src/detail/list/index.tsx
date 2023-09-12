/** @format */

import { useHash } from '@/components/hooks/useHash';
import Segmented from '@/packages/segmented';
import Selects from '@/packages/selects';
import { useMemo } from 'react';
import MessageList from './messageList';
import BlockList from './blockList';
import useUpdateQuery from '@/components/hooks/useUpdateQuery';
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery';
import TracesList from './tracesList';
import classNames from 'classnames';
import styles from './style.module.scss'

export default ({
  accountId,
  tabList,
  defaultActive,
  actorId
}: {
  accountId?: string | string[];
  tabList: Array<any>;
    defaultActive: string;
  actorId:string
}) => {
  const updateQuery = useUpdateQuery();
  const removeQueryParam = useRemoveQueryParam();
  const { hash, hashParams } = useHash();
  const { name, p } = hashParams || {};

  const activeTab = useMemo(() => {
    if (hash) {
      return hash;
    }
    return defaultActive;
  }, [defaultActive, hash]);

  const method = useMemo(() => {
    if (name && typeof name === 'string') {
      return name;
    }
    return 'all';
  }, [name]);

  const activeItem = useMemo(() => {
    return tabList.find((v) => v.dataIndex === activeTab);
  }, [activeTab, tabList]);

  return (
    <div className={classNames(styles.list,'mt-5')}>
      <div className={classNames(styles['list-header'],'flex justify-between items-center')}>
        <Segmented
          data={tabList || []}
          ns='detail'
          defaultValue={activeTab}
          defaultActive={ defaultActive}
          isHash={true}
        />
        {activeItem?.headerOptions && (
          <Selects
            className={styles['select-wrap']}
            value={method}
            options={activeItem?.headerOptions || []}
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

      <div className='card_shadow p-5 mt-5 min-h-[300px] table'>
        {activeTab === 'message_list' && (
          <MessageList accountId={accountId} methodName={method} />
        )}
        {activeTab === 'block_list' && <BlockList accountId={accountId} />}
        {activeTab === 'traces_list' && (
          <TracesList accountId={accountId} methodName={method} />
        )}
      </div>
    </div>
  );
};
