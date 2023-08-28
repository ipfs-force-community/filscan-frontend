/** @format */

import { Translation } from '@/components/hooks/Translation';
import { apiUrl } from '@/contents/apiUrl';
import { gas_24 } from '@/contents/statistic';
import Table from '@/packages/Table';
import Gas from '@/src/statistics/Gas';
import useAxiosData from '@/store/useAxiosData';
import { useMemo } from 'react';

export default () => {
  const { tr } = Translation({ ns: 'static' });
  const { data: GasData, loading, error } = useAxiosData(apiUrl.static_gas_24);
  const columns: any = useMemo(() => {
    return gas_24.columns.map((item: any) => {
      return { ...item, align: 'center', title: tr(item.title) };
    });
  }, [tr]);

  return (
    <div className='main_contain'>
      <div className='flex flex-col text-xl font-medium gap-y-2.5 mb-4'>
        <span>{tr('gas_total')}</span>
        <span>{tr('gas')}</span>
      </div>
      <div className='w-full h-[348px] card_shadow p-5 border rounded-xl'>
        <Gas />
      </div>
      <>
        <div className='flex flex-col text-xl font-medium gap-y-2.5 my-5'>
          <span>{tr('gas_24')}</span>
        </div>
        <div className='border  rounded-xl p-5	card_shadow border_color flex items-center'>
          <Table
            data={(GasData && GasData.items) || []}
            columns={columns}
            loading={loading}
          />
        </div>
      </>
    </div>
  );
};
