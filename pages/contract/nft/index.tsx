/** @format */

import { Translation } from '@/components/hooks/Translation';
import { apiUrl } from '@/contents/apiUrl';
import { contract_nfts, contract_token } from '@/contents/contract';
import Table from '@/packages/Table';
import useAxiosData from '@/store/useAxiosData';
import { pageLimit } from '@/utils';
import { useMemo, useState } from 'react';

export default () => {
  const { tr } = Translation({ ns: 'contract' });
  const [current, setCurrent] = useState(1);
  const payload = useMemo(() => {
    return {
      index: current - 1,
      limit: pageLimit,
    };
  }, [current]);

  const { data: NftsData, loading } = useAxiosData(
    apiUrl.contract_nfts,
    payload
  );

  const columns = useMemo(() => {
    return contract_nfts.columns.map((v: any) => {
      return {
        ...v,
        title: typeof v.title === 'string' ? tr(v.title) : v.title(),
      };
    });
  }, [tr]);

  return (
    <div className='main_contain '>
      <div className='flex flex-col text-xl font-medium gap-y-2.5 mb-4'>
        <span>{tr('nfts_list')}</span>
      </div>
      <div className='border  rounded-xl p-5 card_shadow border_color flex items-center'>
        <Table
          data={NftsData?.items || []}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
};
