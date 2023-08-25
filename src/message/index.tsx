/** @format */

import { Translation } from '@/components/hooks/Translation';
import { apiUrl } from '@/contents/apiUrl';
import { message_detail } from '@/contents/detail';
import Content from '@/packages/content';
import NoData from '@/packages/noData';
import fetchData from '@/store/server';
import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';

export default ({ cid }: { cid: string | string[] }) => {
  const { tr } = Translation({ ns: 'detail' });
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [TransferData, setTransfer] = useState<any>(undefined);
  const [TransferNFTData, setTransferNft] = useState<any>(undefined);

  useEffect(() => {
    if (cid) {
      load();
    }
  }, [cid]);

  const load = async () => {
    setLoading(true);
    const result: any = await fetchData(apiUrl.detail_message, {
      message_cid: cid,
    });
    setLoading(false);
    setData(result?.MessageDetails || {});
    if (result?.MessageDetails?.message_basic?.cid) {
      loadTrans(result?.MessageDetails?.message_basic?.cid);
    }
  };

  const loadTrans = (id: string) => {
    //erc20
    fetchData(apiUrl.contract_transferInMessage, { cid: id }).then(
      (result: any) => {
        setTransfer(result?.items || []);
      }
    );
    //nft
    fetchData(apiUrl.contract_transferInMessageNft, { cid: id }).then(
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

  return (
    <div className='main_contain'>
      <div className='my-2.5 font-DINPro-Bold font-semibold text-lg'>
        {tr(message_detail?.title || '')}
      </div>
      <div className='flex gap-y-5 flex-col'>
        {message_detail.content.map((itemContent, index) => {
          return (
            <div
              key={index}
              className='card_shadow border border_color rounded-xl p-5'>
              <Content
                ns='detail'
                content={itemContent}
                data={{
                  ...data,
                  message_ERC20Trans: TransferData,
                  // swap_info: swap,
                  nftTrans: TransferNFTData,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
