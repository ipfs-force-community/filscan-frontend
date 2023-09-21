/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import { formatNumber, pageLimit } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import useAxiosData from '@/store/useAxiosData';
import {
  token_Dex_columns,
} from '@/contents/contract';

export default ({ id }: { id?: string | string[] }) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'contract' });
  const { axiosData,loading } = useAxiosData();
  const [data, setData] = useState({
    dataSource: [],
    total: 0,
  });
  //const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  const load = async (cur?: number) => {
    // setLoading(true);
    const index = cur || current;
    const result = await axiosData(apiUrl.contract_ERC20Dex, {
      contract_id: id,
      page: index - 1,
      limit: pageLimit,
    });
    // setLoading(false);
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
      <span className='text_des text-sm ml-2.5'>
        {tr('dex_total', { value:formatNumber(data?.total||0) })}
      </span>
      <div className='card_shadow p-5 mt-2.5 rounded-xl border border_color '>
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
