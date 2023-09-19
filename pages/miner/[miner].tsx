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
import Copy from '@/components/copy';
import useAxiosData from '@/store/useAxiosData';
import AccountDetail from '@/src/detail/accountDetail';

export default () => {
  const router = useRouter();
  const { miner } = router.query;
  const [data, setData] = useState<any>({});
  const [loadingBalance, setBalanceLoading] = useState<boolean>(false);
  const [method, setMethod] = useState<any>([]);
  const { tr } = Translation({ ns: 'detail' });
  const { axiosData } = useAxiosData()

  useEffect(() => {
    if (miner) {
      loadMinerData();
      loadMethod();
    }
  }, [miner]);

  const loadMethod = async () => {
    const result: any = await axiosData(apiUrl.detail_list_method, {
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
    setBalanceLoading(true);
    const result: any = await axiosData(apiUrl.detail_account, {
      account_id: miner,
    });
    setBalanceLoading(false);
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
    <div className={classNames(styles.miner, 'main_contain')}>
      <div className={'mb-2.5 DINPro-Medium font-medium text-lg flex items-center'}>
        <span className={'ml-4 flex items-center gap-x-1'}>
          <span>{ tr('account_title')}:</span>
          <span>{miner || ''}</span>
          { miner&& typeof miner ==='string' && <Copy text={miner} />}
        </span>
      </div>
      <div className='flex w-full card_shadow rounded-xl !overflow-hidden'>
        <AccountBalance
          data={data?.account_indicator || {}}
          loading={loadingBalance}
        />
        <Power data={data?.account_indicator || {}} />
      </div>
      <OverView overView={miner_overview} accountId={miner} />
      <div className={classNames(styles.column,'flex mt-6 gap-x-5')}>
        <AccountChange accountId={miner} interval={'30d'} />
        <PowerChange accountId={miner} type={ 'miner'} />
      </div>
      <AccountDetail data={data} type={ 'miner'} />
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
