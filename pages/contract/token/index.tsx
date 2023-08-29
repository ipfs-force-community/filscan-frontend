/** @format */

import { Translation } from '@/components/hooks/Translation';
import { apiUrl } from '@/contents/apiUrl';
import { contract_token } from '@/contents/contract';
import Table from '@/packages/Table';
import useAxiosData from '@/store/useAxiosData';
import { useMemo } from 'react';

export default () => {
  const { tr } = Translation({ ns: 'contract' });

  const { data: TokenData, loading } = useAxiosData(apiUrl.contract_ERC20List);

  const columns = useMemo(() => {
    return contract_token.columns(tr).map((v: any) => {
      return {
        ...v,
        title: typeof v.title === 'string' ? tr(v.title) : v.title(),
      };
    });
  }, [tr]);

  return (
    <div className='main_contain '>
      <div className='flex flex-col text-xl font-medium gap-y-2.5 mb-4'>
        <span>{tr('token_list')}</span>
      </div>
      <div className='border  rounded-xl p-5	card_shadow border_color flex items-center'>
        <Table
          data={TokenData?.items || []}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
};
