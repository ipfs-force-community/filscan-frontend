/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import { detailPageLimit } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import useAxiosData from '@/store/useAxiosData';
import {
  token_Dex_columns,
  token_owner_columns,
  token_transfer_columns,
} from '@/contents/contract';

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

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  const load = async (cur?: number) => {
    setLoading(true);
    const index = cur || current;
    const result = await axiosData(apiUrl.contract_ERC20Dex, {
      contract_id: id,
      page: index - 1,
      limit: detailPageLimit,
    });
    setLoading(false);
    setData({
      dataSource: result?.items || [],
      total: result?.total || 0,
    });
  };

  const columns = useMemo(() => {
    return token_Dex_columns.map((v) => {
      return { ...v, title: tr(v.title) };
    });
  }, [theme, tr]);

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let cur: number = pagination.current || current;
    setCurrent(cur);
    load(cur);
  };
  return (
    <>
      <span className='text_des text-sm'>
        {tr('dex_total', { value: data.total })}
      </span>
      <div className='card_shadow p-5 my-2.5 '>
        <Table
          data={data.dataSource}
          total={data.total}
          columns={columns}
          loading={loading}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
