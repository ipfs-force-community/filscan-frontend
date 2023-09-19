/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import { ercToken_list, message_list } from '@/contents/detail';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import { pageLimit } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import useAxiosData from '@/store/useAxiosData';

export default ({
  accountId,
}: {
  accountId?: string | string[];
}) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'detail' });
  const [loadingTable, setTableLoading] = useState(false);
  const { axiosData } = useAxiosData();
  const [data, setData] = useState({
    dataSource: [],
    total: 0,
  });
  const [current, setCurrent] = useState(1);
  const [fromList, setFrom] = useState({});
  const [toList, setTo] = useState({});

  const columns = useMemo(() => {
    return ercToken_list(fromList, toList).map((v) => {
      return { ...v, title: tr(v.title) };
    });
  }, [theme, lang, fromList, toList]);

  useEffect(() => {
    if (accountId) {
      load();
    }
  }, [accountId]);

  const load = async (cur?: number,) => {
    setTableLoading(true);
    const showIndex = cur || current;
    const result: any = await axiosData(apiUrl.contract_ERC20Transfers, {
      address: accountId,
      filters: {
        page: showIndex - 1,
        limit: pageLimit,
      },
    });
    setTableLoading(false);
    const showList = result?.items || [];
    setData({
      dataSource: showList,
      total: result?.total_count,
    });
    if (showList.length > 0) {
      const formItems = showList.map((v: any) => v.from);
      const toItems = showList.map((v: any) => v.to);
      loadFnsUrl(formItems, 'form');
      loadFnsUrl(toItems, 'to');
    }
  };

  const loadFnsUrl = async (items: Array<any>, type: string) => {
    if (items.length > 0) {
      const fnsData = await axiosData(`${apiUrl.contract_fnsUrl}`, {
        addresses: items,
      });
      if (type === 'form') {
        setFrom(fnsData);
      } else {
        setTo(fnsData);
      }
    }
  };

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let cur: number = pagination.current || current;
    setCurrent(cur);
    load(cur);
  };
  return (
    <>
      <span className='absolute -top-5 text_des text-xs'>{tr('contract_token_list_total', {value:data.total})}</span>
      <Table
        key='list_token'
        data={data.dataSource}
        total={data.total}
        columns={columns}
        loading={loadingTable}
        onChange={handleChange}
      /></>
  );
};
