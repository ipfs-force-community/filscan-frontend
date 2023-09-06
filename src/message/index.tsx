/** @format */

import { BrowserView, MobileView } from '@/components/device-detect';
import { Translation } from '@/components/hooks/Translation';
import { apiUrl } from '@/contents/apiUrl';
import { message_detail } from '@/contents/detail';
import Content from '@/packages/content';
import NoData from '@/packages/noData';
import useAxiosData from '@/store/useAxiosData';
import { Skeleton } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss'
import classNames from 'classnames';
import Copy from '@/components/copy';
import copySvgMobile from '@/assets/images/icon-copy.svg';
import { get } from 'lodash';
import { formatFilNum, get_account_type } from '@/utils';

export default ({ cid }: { cid: string | string[] }) => {
  const { tr } = Translation({ ns: 'detail' });
  const { axiosData } = useAxiosData();
  const [TransferData, setTransfer] = useState<any>(undefined);
  const [TransferNFTData, setTransferNft] = useState<any>(undefined);

  const { data: result, loading } = useAxiosData(apiUrl.detail_message, {
    message_cid: cid,
  });

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

    // fetchData(apiUrl.contract_swap, { cid: id }).then((result: any) => {
    //   setSwap(result?.swap_info);
    // });
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

  const renderExitCode = (code:string)=>{
    if (code.startsWith('Ok')) {
      return (
        <span className='flex px-2 py-1 gap-x-1 bg-success_bg rounded-sm items-center'>
          {getSvgIcon('successIcon')}
          <span className='text-success text-cm'>Success</span>
        </span>
      );
    }
    if (code.startsWith('Err')) {
      return (
        <span className='flex px-2 py-1 gap-x-1 rounded-sm items-center'>
          {getSvgIcon('errorIcon')}
          <span className='text_red text-cm'>Error</span>
        </span>
      );
    }

    return (
      <span className='flex px-2 py-1 gap-x-1  rounded-sm items-center'>
        {getSvgIcon('pendingIcon')}
        <span className='text-cm'>Pending</span>
      </span>
    );
  }

  return (
    <div className={classNames(styles.message,'main_contain')}>
      <div className='my-2.5 font-DINPro-Bold font-semibold text-lg'>
        {tr(message_detail?.title || '')}
      </div>

      <div className={classNames(styles.trans,'flex gap-y-5 flex-col')}>
        <div
          className='card_shadow border border_color rounded-xl p-5'>
          <Content
            ns='detail'
            content={message_detail.trans}
            data={{
              ...data,
              message_ERC20Trans: TransferData,
              nftTrans: TransferNFTData,
            }}
          />
        </div>
      </div>
      <MobileView>
        <div className={styles.title}>{tr('transfer_records')}</div>

        {
          get(data,'consume_list').map((n:any,index:number)=>{
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
            content={message_detail.detail}
            data={{
              ...data,
              message_ERC20Trans: TransferData,
              nftTrans: TransferNFTData,
            }}
          />
        </div>
      </div>
    </div>
  );
};
