/** @format */

import useAxiosData from '@/store/useAxiosData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import token from '../contract/token';
import { apiUrl } from '@/contents/apiUrl';
import { token_details } from '@/contents/contract';
import Content from '@/packages/content';
import Image from '@/packages/image';
import { Translation } from '@/components/hooks/Translation';
import List from '@/src/fevm/list';

export default () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const { tr } = Translation({ ns: 'contract' });
  const { axiosData } = useAxiosData();

  const [marketData, setMarket] = useState({});
  const [overviewData, setOverview] = useState<any>({});

  useEffect(() => {
    if (tokenId) {
      axiosData(apiUrl.contract_ERC20Summary, {
        contract_id: tokenId,
      }).then((res: any) => {
        setOverview(res || {});
      });
      axiosData(apiUrl.contract_ERC20Market, {
        contract_id: tokenId,
      }).then((res: any) => {
        setMarket({ ...res, tokenName: res?.token_name } || {});
      });
    }
    load();
  }, [tokenId]);
  const load = () => {};
  return (
    <div className='main_contain'>
      <div className='flex items-center text-xl font-DINPro-Bold gap-x-1 mb-4'>
        {overviewData?.token_name && (
          <Image width={40} height={40} src={overviewData.icon_url} alt='' />
        )}
        {overviewData?.token_name?.toLocaleUpperCase()}
      </div>
      <div className='flex gap-x-5'>
        {token_details.headerList.map((tokenItem) => {
          const showData =
            tokenItem.title === 'market' ? marketData : overviewData;
          return (
            <div className='flex-1 border border_color card_shadow rounded-lg px-2.5 py-5'>
              <div className='text-base font-medium px-2.5'>
                {tr(tokenItem.title)}
              </div>
              <Content
                content={tokenItem.list}
                ns={'contract'}
                data={showData || {}}
              />
            </div>
          );
        })}
      </div>
      <List
        tabList={token_details.tabList}
        defaultActive={'transfer'}
        type='token'
        id={tokenId}
      />
    </div>
  );
};
