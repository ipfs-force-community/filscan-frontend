/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import { contract_rank, homeContractRank } from '@/contents/contract';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { useEffect, useMemo, useState } from 'react';
import verifySvg from '@/assets/images/verify.svg';
import Image from 'next/image';
import Link from 'next/link';

const default_sort = {
  field: 'transfer_count',
  order: 'descend',
};
export default ({ origin }: { origin?: string }) => {
  const { tr } = Translation({ ns: 'contract' });
  const { theme, lang } = useFilscanStore();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [sort, setSort] = useState<any>({ ...default_sort });

  const [dataSource, setDataSource] = useState({
    data: [],
    total: undefined,
  });

  useEffect(() => {
    load();
  }, []);

  const load = async (cur?: number, orders?: any) => {
    const index = cur || current;
    const sortFile = orders || sort;
    setLoading(true);
    const data: any = await fetchData(apiUrl.contract_rank, {
      page: index - 1,
      limit: 7,
      sort: sortFile.order === 'ascend' ? 'asc' : 'desc',
      field: sortFile?.field,
    });
    setLoading(false);
    setDataSource({
      data: data?.evm_contract_list || [],
      total: data?.total,
    });
  };

  const columns = useMemo(() => {
    const newArr =
      origin === 'home'
        ? contract_rank.columns.slice(0, 5)
        : contract_rank.columns;
    let content = newArr.map((item) => {
      if (item.dataIndex === 'contract_name') {
        item.render = (text: string, record: any) => {
          if (text) {
            return (
              <span className='flex gap-x-2 items-center'>
                <Link href={`/address/${record.contract_address}`}>{text}</Link>
                <Image src={verifySvg} width={13} height={14} alt='' />
              </span>
            );
          }
          return (
            <Link href='/contract/verify' className='text_color'>
              {tr('ver_address')}
            </Link>
          );
        };
      }
      return {
        ...item,
        title: tr(item.title),
        width:
          origin === 'home' ? homeContractRank[item.dataIndex] : item.width,
      };
    });
    return content;
  }, [theme, lang]);

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
