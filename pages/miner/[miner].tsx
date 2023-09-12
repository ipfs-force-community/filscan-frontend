/** @format */

import { apiUrl } from '@/contents/apiUrl';
import fetchData from '@/store/server';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import AccountBalance from '@/src/detail/accountBalance';
import Power from '@/src/detail/Power';
import OverView from '@/src/detail/overView';
import { minerTabs, miner_overview } from '@/contents/detail';
import AccountChange from '@/src/detail/accountChange';
import PowerChange from '@/src/detail/powerChange';
import List from '@/src/detail/list';
import { Translation } from '@/components/hooks/Translation';
import { BrowserView, MobileView } from '@/components/device-detect';
import classNames from 'classnames';
import styles from './style.module.scss'

export default () => {
  const router = useRouter();
  const { miner } = router.query;
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [method, setMethod] = useState<any>([]);
  const { tr } = Translation({ ns: 'detail' });

  useEffect(() => {
    if (miner) {
      loadMinerData();
      loadMethod();
    }
  }, [miner]);

  const loadMethod = async () => {
    const result: any = await fetchData(apiUrl.detail_list_method, {
      account_id: miner,
    });
    const newMethod: any = [
      {
        title: tr('all_method'),
        dataIndex: 'all',
        value: 'all',
      },
    ];
    Object.keys(result?.method_name_list || {}).forEach((li: string) => {
      newMethod.push({ label: li, dataIndex: li, value: li });
    });
    setMethod(newMethod);
  };

  const loadMinerData = async () => {
    setLoading(true);
    const result: any = await fetchData(apiUrl.detail_account, {
      account_id: miner,
    });
    setLoading(false);
    setData(result?.account_info?.account_miner || {});
  };

  const newTabList = useMemo(() => {
    const newTabs: any = [];
    minerTabs.forEach((v: any) => {
      if (v?.optionsUrl === 'AllMethodByAccountID') {
        v.headerOptions = method;
      }
      newTabs.push({ ...v });
    });
    return newTabs;
  }, [method]);

  return (
    <div className={classNames(styles.miner,'main_contain')}>
      <div className='flex w-full card_shadow rounded-xl'>
        <AccountBalance
          data={data?.account_indicator || {}}
          loading={loading}
        />
        <Power data={data?.account_indicator || {}} />
      </div>
      <OverView overView={miner_overview} accountId={miner} />

      <div className='flex mt-6 gap-x-5'>
        <AccountChange accountId={miner} interval={'30d'} />
        <PowerChange accountId={miner} />
      </div>
      <div>
        <List
          tabList={newTabList}
          defaultActive='message_list'
          accountId={miner}
        />
      </div>
    </div>
  );
};
