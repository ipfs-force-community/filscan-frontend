/** @format */

import { Translation } from '@/components/hooks/Translation';
import { apiUrl } from '@/contents/apiUrl';
import { gas_24 } from '@/contents/statistic';
import Table from '@/packages/Table';
import Gas from '@/src/statistics/Gas';
import useAxiosData from '@/store/useAxiosData';
import { useMemo } from 'react';
import styles from './index.module.scss'
import classNames from 'classnames';

export default () => {
  const { tr } = Translation({ ns: 'static' });
  const { data: GasData, loading, error } = useAxiosData(apiUrl.static_gas_24);
  const columns: any = useMemo(() => {
    return gas_24.columns.map((item: any) => {
      return { ...item, title: tr(item.title) };
    });
  }, [tr]);

  return (
    <div className={classNames(styles['statistics-gas'],'main_contain ')}>
      <div className='flex flex-col text-lg font-medium gap-y-2.5 mb-4 mx-2.5 gas-title'>
        <span>{tr('gas')}</span>
      </div>
      <div className='w-full h-[348px] card_shadow pr-5 pt-5 pb-2.5 !overflow-hidden border  border_color rounded-xl'>
        <Gas />
      </div>
      <>
        <div className='flex flex-col text-lg font-medium gap-y-2.5 my-5'>
          <span>{tr('gas_24')}</span>
        </div>
        <div className='border rounded-xl p-5 card_shadow border_color flex items-center gas-table'>
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
