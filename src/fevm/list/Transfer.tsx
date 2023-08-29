/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import { message_list } from '@/contents/detail';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import { detailPageLimit, pageLimit } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import useAxiosData from '@/store/useAxiosData';
import { token_transfer_columns } from '@/contents/contract';

export default ({
  methodName,
  id,
}: {
  methodName?: string;
  id?: string | string[];
}) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'contract' });
  const { axiosData } = useAxiosData();
  const [data, setData] = useState({
    dataSource: [],
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState(1);
  const [fromList, setFrom] = useState({});
  const [toList, setTo] = useState({});

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  const load = async (cur?: number) => {
    setLoading(true);
    const index = cur || current;
    const result = await axiosData(apiUrl.contract_ERC20Transfer, {
      contract_id: id,
      page: index - 1,
      limit: pageLimit,
    });
    setLoading(false);
    setData({
      dataSource: result?.items || [],
      total: result?.total || 0,
    });
    if (result.items && result.items.length > 0) {
      const formItems = result?.items.map((v: any) => v.from);
      const toItems = result?.items.map((v: any) => v.to);
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

  const columns = useMemo(() => {
    return token_transfer_columns(fromList, toList).map((v) => {
      return { ...v, title: tr(v.title) };
    });
  }, [theme, tr, fromList, toList]);

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let cur: number = pagination.current || current;
    setCurrent(cur);
    load(cur);
  };
  return (
    <Table
      data={data.dataSource}
      total={data.total}
      columns={columns}
      loading={loading}
      onChange={handleChange}
    />
  );
};
