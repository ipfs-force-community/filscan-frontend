/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { useEffect, useMemo, useState } from 'react';
import { homeDefiColumns, defi_list } from '@/contents/fevm';
import { pageHomeLimit, pageLimit } from '@/utils';
import styles from './index.module.scss'
import classNames from 'classnames';
import useWindow from '@/components/hooks/useWindown';
import Image from 'next/image';
import TextTip from '@/packages/textTooltip';

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
  const {isMobile} = useWindow()
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
      limit: origin === 'home'? pageHomeLimit:pageLimit,
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

    defi_list.columns(progress,origin).forEach((col) => {
      if (origin === 'home') {
        if (homeDefiColumns.hasOwnProperty(col.dataIndex)) {
          newArr.push({
            ...col,
            title: tr(col.title),
            width: homeDefiColumns[col.dataIndex],
          });
        }
      } else {
        if (isMobile) {
          if (col.dataIndex === 'protocol') {
            return
          }
          if (col.dataIndex === 'rank') {
            //@ts-ignore
            col.title = (value:string,record:any,index)=>{
              return <div>{`#${record?.rank}`}</div>
            }
            col.render = (text: string, record: any) => {
              return (
                <span
                  className={styles.rank}
                  onClick={() => {
                    if (record.main_site) {
                      window.open(record.main_site);
                    }
                  }}>
                  <Image
                    src={record.icon_url || ''}
                    width={25}
                    height={25}
                    alt='logo'
                  />
                  <TextTip text={record.protocol} />
                </span>
              );
            }
          }
        }
        newArr.push({ ...col, title: typeof col.title === 'string' ? tr(col.title) : col.title });
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

  console.log('====30324',columns)
  return (
    <div className={classNames(`mt-4 border rounded-xl p-5	card_shadow border_color ${origin === 'home' ?'h-[650px]':'h-full'}`,styles.wrap,styles.reset)}>
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
