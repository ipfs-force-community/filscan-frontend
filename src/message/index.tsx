/** @format */

import { BrowserView, MobileView } from '@/components/device-detect';
import { Translation } from '@/components/hooks/Translation';
import { useHash } from '@/components/hooks/useHash';
import { apiUrl } from '@/contents/apiUrl';
import { message_detail } from '@/contents/detail';
import Content from '@/packages/content';
import NoData from '@/packages/noData';
import useAxiosData from '@/store/useAxiosData';
import { Skeleton } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss'
import classNames from 'classnames';
import { get, has } from 'lodash';
import { formatFilNum, get_account_type } from '@/utils';
import Segmented from '@/packages/segmented';
import Trade from './Trade'
import Event from './Event';

export default ({ cid }: { cid: string | string[] }) => {
  const { tr } = Translation({ ns: 'detail' });
  const { axiosData } = useAxiosData();
  const [TransferData, setTransfer] = useState<any>(undefined);
  const [TransferNFTData, setTransferNft] = useState<any>(undefined);
  // const [isF4, setIsF4] = useState(false);
  const [swap, setSwap] = useState();
  const { hash } = useHash()
  const { data: result, loading } = useAxiosData(apiUrl.detail_message, {
    message_cid: cid,
  });

  const active = useMemo(() => {
    if (hash) {
      return hash
    }
    return 'detail'
  },[hash])

  const data = useMemo(() => {
    return result?.MessageDetails || {};
  }, [result]);

  useEffect(() => {
    loadTrans(data?.message_basic?.cid);
  }, [data?.message_basic?.cid]);

  const loadTrans = (id: string) => {
    //erc20
    axiosData(apiUrl.contract_transferInMessage, { cid: id }).then(
      (result: any) => {
        setTransfer(result?.items || []);
      }
    );
    //nft
    axiosData(apiUrl.contract_transferInMessageNft, { cid: id }).then(
      (result: any) => {
        setTransferNft(result?.items || []);
      }
    );

    //contract_swap
    axiosData(apiUrl.contract_swap, { cid: id }).then(
      (result: any) => {
        setSwap(result?.swap_info);
      }
    );
  };

  if (loading) {
    return (
      <div className='main_contain'>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }
  if (!loading && Object.keys(data).length === 0) {
    return <NoData />;
  }

  const renderItemChild = () => {
    switch (active) {
    case 'trade':
      return <Trade cid={cid} />
    case 'event_log':
      return <Event cid={cid} />
    default:
      return <>
        <div className={classNames(styles.detail,'flex gap-y-5 flex-col mb-5')}>
          <div
            className='card_shadow border border_color rounded-xl p-5'>
            <Content
              ns='detail'
              contents={message_detail.trans}
              data={{
                ...data,
                message_ERC20Trans: TransferData,
                nftTrans: TransferNFTData,
                swap_info:swap
              }}
            />
          </div>
        </div>
        <MobileView>
          <div className={styles.title}>{tr('transfer_records')}</div>
          {
            get(data,'consume_list')?.map((n:any,index:number)=>{
              return <div className={styles.card} key={`card-${index}`}>
                <div className={styles['card-item']}>
                  <div className={classNames(styles['card-item-label'],'w-28')}>{tr('from_ath')}：</div>
                  <div className={styles['card-item-value']}> {get_account_type(n['from'])}</div>
                </div>
                <div className={styles['card-item']}>
                  <div className={classNames(styles['card-item-label'],'w-28')}>{tr('to_ath')}：</div>
                  <div className={styles['card-item-value']}> {get_account_type(n['to'])}</div>
                </div>
                <div className={styles['card-item']}>
                  <div className={classNames(styles['card-item-label'],'w-28')}>{tr('value')}：</div>
                  <div className={styles['card-item-value']}> {formatFilNum(n['value'], false, false, 4) || '--'}</div>
                </div>
                <div className={styles['card-item']}>
                  <div className={classNames(styles['card-item-label'],'w-28')}>{tr('consume_type')}：</div>
                  <div className={styles['card-item-value']}> {tr(n['consume_type'])}</div>
                </div>
              </div>

            })
          }
        </MobileView>
        <div className={classNames(styles.detail,'flex gap-y-5 flex-col')}>
          <div
            className='card_shadow border border_color rounded-xl p-5'>
            <Content
              ns='detail'
              contents={message_detail.detail}
              data={{
                ...data,
                message_ERC20Trans: TransferData,
                nftTrans: TransferNFTData,
              }}
            />
          </div>

        </div>
      </>
    }

  }

  return (
    <div className={classNames(styles.message,'main_contain')}>
      <div className='flex items-center my-2.5'>
        <span className='font-DINPro-Bold font-semibold text-lg'>
          {tr(message_detail?.title || '')}
        </span>
        <Segmented data={message_detail.tabs} defaultActive='detail' defaultValue={active} ns={'detail'} isHash={true} />
      </div>
      {renderItemChild()}
    </div>
  );
};
