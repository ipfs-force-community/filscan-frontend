/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import { trance_list } from '@/contents/detail';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import { pageLimit } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import useAxiosData from '@/store/useAxiosData';

export default ({
  methodName,
  accountId,
}: {
  methodName?: string;
  accountId?: string | string[];
}) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'detail' });
  const [loading, setLoading] = useState(false);
  const { axiosData } = useAxiosData();

  const [data, setData] = useState({
    dataSource: [],
    total: 0,
  });
  const [current, setCurrent] = useState(1);
  const [fromList, setFrom] = useState({});
  const [toList, setTo] = useState({});

  const columns = useMemo(() => {
    return trance_list(fromList, toList).map((v) => {
      return { ...v, title: tr(v.title) };
    });
  }, [theme, lang, fromList, toList]);

  useEffect(() => {
    if (accountId) {
      load();
    }
  }, [accountId]);

  const load = async (cur?: number, method?: string) => {
    setLoading(true);
    const showIndex = cur || current;
    const showMethod = method || methodName;
    const result: any = await axiosData(apiUrl.detail_trance_list, {
      account_id: accountId,
      filters: {
        index: showIndex - 1,
        limit: pageLimit,
        method_name: showMethod === 'all' ? '' : showMethod,
      },
    });
    setLoading(false);
    const showList = result?.traces_by_account_id_list || [];
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
    <Table
      key={'trance_list'}
      data={data.dataSource}
      total={data.total}
      columns={columns}
      loading={loading}
      onChange={handleChange}
    />
  );
};
