/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import { homeContractRank } from '@/contents/contract';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { useEffect, useMemo, useState } from 'react';
import { homeDefiColumns, defi_list } from '@/contents/fevm';
import { pageHomeLimit, pageLimit } from '@/utils';

const default_sort = {
  field: 'tvl',
  order: 'descend',
};
export default ({ origin }: { origin?: string }) => {
  const { tr } = Translation({ ns: 'fevm' });
  const { theme } = useFilscanStore();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [sort, setSort] = useState<any>({ ...default_sort });
  const [progress,setProgress] = useState<number>(0)
  const [dataSource, setDataSource] = useState({
    data: [],
    total: undefined,
  });

  useEffect(() => {
    load();
  }, []);

  const load = async (cur?: number, sorter?: any) => {
    setLoading(true);
    const page = cur || current;
    const sortData = sorter || sort;
    const result: any = await fetchData(apiUrl.fevm_defiList, {
      page: page - 1,
      limit: origin === 'home'? pageLimit:pageHomeLimit,
      field: sortData.field,
      reverse: sortData.order === 'ascend',
    });
    setLoading(false);
    setDataSource({
      data:
        result?.items?.map((v: any, index: number) => {
          return { ...v, rank: index * page + 1 };
        }) || [],
      total: result?.total,
    });
    if (sortData.field === default_sort.field && sortData.order === 'descend') {
      //默认排序，pr
      setProgress(result?.items[0]?.tvl || 0)
    }
  };

  const columns = useMemo(() => {
    const newArr: any = [];

    defi_list.columns(progress,origin).forEach((col: any) => {
      if (origin === 'home') {
        if (homeDefiColumns.hasOwnProperty(col.dataIndex)) {
          newArr.push({
            ...col,
            title: tr(col.title),
            width: homeContractRank[col.dataIndex],
          });
        }
      } else {
        newArr.push({ ...col, title: tr(col.title) });
      }
    });

    return newArr;
  }, [theme, tr,progress]);

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let cur: number = pagination.current || current;
    let order = { ...sort };
    if (sorter.field) {
      order = {
        field: sorter.field,
        order: sorter.order,
      };
      cur = 1;
    }
    setCurrent(1);
    setSort(order);
    load(cur, order);
  };

  return (
    <div className='mt-4 h-[491px] border  rounded-xl p-5	card_shadow border_color'>
      <Table
        key='contract_rank'
        className='-mt-2.5 '
        data={dataSource?.data || []}
        columns={columns || []}
        loading={loading}
        onChange={handleChange}
      />
    </div>
  );
};
