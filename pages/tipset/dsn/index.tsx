/** @format */

import { apiUrl } from '@/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import useUpdateQuery from '@/components/hooks/useUpdateQuery';
import Search from '@/components/search';
import { address_list, dsn_list, message_list } from '@/contents/tipset';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { pageLimit } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

export default () => {
  const { tr } = Translation({ ns: 'tipset' });
  const { theme, lang } = useFilscanStore();
  const updateQuery = useUpdateQuery();
  const { p } = useRouter().query;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [dataSource, setDataSource] = useState({
    data: [],
    total: undefined,
  });

  const current = useMemo(() => {
    if (p && typeof p === 'string') {
      return Number(p);
    }
    return 1;
  }, [p]);

  useEffect(() => {
    load(current);
  }, [current]);

  const load = async (cur?: number, searching?: string) => {
    setLoading(true);
    const showIndex = cur || current;
    const input = searching || search;
    const result: any = await fetchData(apiUrl.tipset_Dsn, {
      input,
      filters: {
        index: showIndex - 1,
        limit: pageLimit,
      },
    });
    setLoading(false);
    setDataSource({
      data: result?.market_deals_list || [],
      total: result?.total_count,
    });
  };

  const columns = useMemo(() => {
    const content = dsn_list.columns.map((v: any) => {
      return { ...v, title: tr(v.title) };
    });
    return content;
  }, [theme, lang]);

  const handleSearch = (search: string) => {
    setSearch(search);
    load(undefined, search);
  };

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    if (pagination?.current) {
      updateQuery({ p: pagination.current });
    }
  };
  return (
    <div className='main_contain'>
      <div className='flex justify-between items-center'>
        <div>
          <div className='font-PingFang font-semibold text-lg'>
            {tr('dsn_list')}
          </div>
          <div className='text_des text-xs'>
            {tr(dsn_list.total_list, { value: dataSource.total })}
          </div>
        </div>
        <Search
          className='w-[400px]'
          placeholder={dsn_list.placeholder}
          onSearch={handleSearch}
          ns='tipset'
          suffix={<SearchOutlined />}
        />
      </div>

      <div className='mt-4 h-full border  rounded-xl p-5	card_shadow border_color'>
        <Table
          className='-mt-2.5 '
          data={dataSource.data}
          total={dataSource.total}
          columns={columns}
          loading={loading}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
