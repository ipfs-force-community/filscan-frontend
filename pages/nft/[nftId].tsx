/** @format */

import useAxiosData from '@/store/useAxiosData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiUrl } from '@/contents/apiUrl';
import { nft_details } from '@/contents/contract';
import Content from '@/packages/content';
import Image from '@/packages/image';
import { Translation } from '@/components/hooks/Translation';
import List from '@/src/fevm/list';
import styles from './index.module.scss'
import classNames from 'classnames';
import { BrowserView, MobileView } from '@/components/device-detect';
export default () => {
  const router = useRouter();
  const { nftId } = router.query;
  const { tr } = Translation({ ns: 'contract' });
  const { axiosData } = useAxiosData();
  const [overviewData, setOverview] = useState<any>({});

  useEffect(() => {
    if (nftId) {
      axiosData(apiUrl.contract_FnsSummary, {
        contract: nftId,
      }).then((res: any) => {
        setOverview(res || {});
      });
    }
  }, [nftId]);
  return (
    <div className={classNames(styles.nft,'main_contain')}>
      <div className='flex items-center text-xl font-DINPro-Bold gap-x-1 mb-4'>
        {overviewData?.token_name && (
          <Image width={40} height={40} src={overviewData.icon_url} alt='' />
        )}
        {overviewData?.token_name?.toLocaleUpperCase()}
      </div>
      <div className={classNames(styles['mobile-column'],'flex gap-x-5')}>
        {nft_details.headerList.map((tokenItem,index) => {
          return (
            <>
              <MobileView>
                <div className='text-base font-medium px-2.5 nft-title'>
                  {tr(tokenItem.title)}
                </div>
              </MobileView>
              <div className='flex-1 border border_color card_shadow rounded-lg px-2.5 py-5 nft-card' key={index}>
                <BrowserView>
                  <div className='text-base font-medium px-2.5'>
                    {tr(tokenItem.title)}
                  </div>
                </BrowserView>
                <Content
                  contents={tokenItem.list}
                  ns={'contract'}
                  data={overviewData || {}}
                />
              </div>
            </>
          );
        })}
      </div>
      <List
        tabList={nft_details.tabList}
        defaultActive={'transfer'}
        type='nfts'
        ids={nftId}
      />
    </div>
  );
};
