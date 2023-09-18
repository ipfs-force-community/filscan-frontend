/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import { contract_rank, homeContractRank } from '@/contents/contract';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { useEffect, useMemo, useState } from 'react';
import verifySvg from '@/assets/images/verify.svg';
import go from '@/assets/images/black_go.svg';
import Image from 'next/image';
import Link from 'next/link';
import { formatDateTime, isIndent, pageHomeLimit, pageLimit } from '@/utils';
import useWindow from '@/components/hooks/useWindown';
import Copy from '@/components/copy';
import { BrowserView, MobileView } from '@/components/device-detect';
import styles from './index.module.scss'
import classNames from 'classnames';
import _ from 'lodash'
import { getSvgIcon } from '@/svgsIcon';
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
  const {isMobile} = useWindow()
  const [dataSource, setDataSource] = useState({
    data: [],
    total: undefined,
    update_time:''
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
      limit: origin === 'home'?pageHomeLimit:pageLimit,
      sort: sortFile.order === 'ascend' ? 'asc' : 'desc',
      field: sortFile?.field,
    });
    setLoading(false);
    setDataSource({
      data: data?.evm_contract_list || [],
      total: data?.total,
      update_time:data?.update_time||''
    });
  };

  const columns = useMemo(() => {
    const newArr =
      origin === 'home'
        ? contract_rank.columns.slice(0, 5)
        : _.cloneDeep(contract_rank.columns);
    let content = newArr.filter((value)=>{
      if (isMobile) {
        return value.dataIndex !== 'contract_address'
      }
      return true
    }).map((item) => {
      if (isMobile && item.dataIndex === 'rank') {
        //@ts-ignore
        item.title = (value:string,record:any,index)=>{
          return <div>{`#${record?.rank}`}</div>
        }

        item.render = (value: any, record: any) => {
          if (!record?.contract_address) return '--';
          return (
            <span className='flex gap-x-2 items-center'>
              <Link className='link_text' href={`/address/${record?.contract_address}`}>
                {isIndent(record?.contract_address, 5, 4)}
              </Link>
              <Copy text={record?.contract_address} />
            </span>
          );
        }
      }

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
        title: typeof item.title === "string" ? tr(item.title) : item.title,
        width:
          origin === 'home' ? homeContractRank[item.dataIndex] : item.width,
      };
    });
    return content;
  }, [theme, tr,isMobile]);

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
    <>
      <MobileView>
        <div className={classNames('font-PingFang font-semibold text-lg',styles.title)}>
          {tr('contract_rank')}
        </div>
        <div className={classNames('text-xs text_des ',styles['title-description'])}>
          {tr('contract_list_total', {value:dataSource.total})}
        </div>
      </MobileView>
      <BrowserView>
        <div className={`flex justify-between items-center h-[30px]`}>
          <div className='font-PingFang font-semibold text-lg	pl-2.5'>
            {tr('contract_rank')}
            { origin !== 'home' && <span className='text_des text-xs font-normal ml-2'>{tr(contract_rank.title_des,{value:formatDateTime(dataSource.update_time,"YYYY-MM-DD HH:mm")})}</span>
            }
          </div>
          {origin === 'home' && <Link className='pr-2.5' href={`/contract/rank`}>
            <Image
              className='cursor-pointer '
              src={go}
              width={18}
              height={18}
              alt='go'
            />
          </Link>}
        </div>
        {origin !== 'home' && <div className='text-xs text_des mx-2.5'> {tr('contract_list_total', {value:dataSource.total})}</div>}
      </BrowserView>
      <div className={classNames(`mt-4 border  rounded-xl p-5	card_shadow border_color ${origin === 'home'?'h-[650px] ':'h-full'}`,styles.reset,styles.table)}>
        <Table
          key='contract_rank'
          className='-mt-2.5 '
          data={dataSource?.data || []}
          columns={columns || []}
          loading={loading}
          onChange={handleChange}
        />
      </div>

    </>
  )
}
