/** @format */

import useAxiosData from '@/store/useAxiosData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiUrl } from '@/contents/apiUrl';
import { token_details } from '@/contents/contract';
import Content from '@/packages/content';
import Image from '@/packages/image';
import { Translation } from '@/components/hooks/Translation';
import List from '@/src/fevm/list';
import styles from './[tokenId].module.scss'
import useWindow from '@/components/hooks/useWindown';
import { BrowserView, MobileView } from '@/components/device-detect';
import classNames from 'classnames';
import Link from 'next/link';
import Copy from '@/components/copy';

export default () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const { tr } = Translation({ ns: 'contract' });
  const { axiosData } = useAxiosData();

  const [marketData, setMarket] = useState({});
  const [overviewData, setOverview] = useState<any>({});
  const { isMobile } = useWindow()

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
    <div className={classNames('main_contain',styles.wrap)}>
      <div className={classNames('flex items-center text-xl font-DINPro-Bold gap-x-1 mb-4',styles.token)}>
        {overviewData?.token_name && (
          <Image width={40} height={40} src={overviewData.icon_url} alt='' />
        )}
        {overviewData?.token_name?.toLocaleUpperCase()}
      </div>
      <div className={classNames('flex gap-x-5',styles['card-wrap'])}>
        {token_details.headerList.map((tokenItem,index) => {
          const showData =
            tokenItem.title === 'market' ? marketData : overviewData;

          if (isMobile && tokenItem.title === 'market') {
            tokenItem.list.forEach((value)=>{
              if (value.dataIndex === "contract_id") {
                value.render = (text: string, record: any) => {
                  if (!text) {
                    return '--';
                  }
                  return (
                    <span className='flex items-center gap-x-2'>
                      <Link href={`/address/${text}`} className='link'>
                        {text}
                      </Link>
                      <Copy text={text} />
                    </span>
                  );
                }
              }
            })
          }

          return (
            <div className={classNames('flex-1 border border_color card_shadow rounded-lg px-2.5 py-5',styles['item'])} key={index}>
              <div className={classNames('text-base font-medium px-2.5',styles.title)}>
                {tr(tokenItem.title)}
              </div>
              <Content
                className={classNames(styles['content'])}
                contents={tokenItem.list}
                ns={'contract'}
                data={showData || {}}
              />
            </div>
          );
        })}
      </div>
      <List
        className={classNames(styles['list-wrap'])}
        tabList={token_details.tabList}
        defaultActive={'transfer'}
        type='token'
        ids={tokenId}
      />
    </div>
  );
};
