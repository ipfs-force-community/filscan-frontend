/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery';
import useUpdateQuery from '@/components/hooks/useUpdateQuery';
import { address_list, message_list } from '@/contents/tipset';
import Table from '@/packages/Table';
import Selects from '@/packages/selects';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { pageLimit } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export default () => {
  const { tr } = Translation({ ns: 'tipset' });
  const { theme, lang } = useFilscanStore();
  const updateQuery = useUpdateQuery();
  const removeQueryParam = useRemoveQueryParam();
  const { name, p } = useRouter().query;
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({
    data: [],
    total: undefined,
  });

  const headerOptions = useMemo(() => {
    return address_list.options.map((v) => {
      return { ...v, label: tr(v.label) };
    });
  }, [lang]);

  const method = useMemo(() => {
    if (name && typeof name === 'string') {
      return name;
    }
    return 'all';
  }, [name]);

  const current = useMemo(() => {
    if (p && typeof p === 'string') {
      return Number(p);
    }
    return 1;
  }, [p]);

  useEffect(() => {
    load(current, method);
  }, [method, current]);

  const load = async (cur?: number, method?: string) => {
    setLoading(true);
    const showIndex = cur || current;
    const method_name = method === 'all' ? '' : method;
    const result: any = await fetchData(apiUrl.tipset_address, {
      index: showIndex - 1,
      limit: pageLimit,
      order: {
        field: method_name,
      },
    });
    setLoading(false);
    const showData =
      result?.get_rich_account_list?.map((item: any, index: number) => {
        return { ...item, rank: index * showIndex + 1 };
      }) || [];
    setDataSource({
      data: showData,
      total: result?.total_count,
    });
  };

  const columns = useMemo(() => {
    const content = address_list.columns.map((v: any) => {
      if (v.dataIndex === 'account_type') {
        return { ...v, title: tr(v.title), render: (text: string) => tr(text) };
      }
      return { ...v, title: tr(v.title) };
    });
    return content;
  }, [theme, tr]);

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    const showCurrent = pagination?.current;
    if (showCurrent) {
      if (showCurrent === 1) {
        removeQueryParam('p');
      } else {
        updateQuery({ p: pagination.current });
      }
    }
  };
  return (
    <div className='main_contain'>
      <div className='flex justify-between items-center'>
        <div>
          <div className='font-PingFang font-semibold text-lg'>
            {tr('address_list')}
          </div>
          <div className='text_des text-xs'>
            {tr(address_list.total_list, { value: dataSource.total })}
          </div>
        </div>
        <Selects
          value={method}
          options={headerOptions}
          onChange={(value) => {
            if (value !== 'all') {
              updateQuery({ name: value });
            } else {
              removeQueryParam('name');
            }
            removeQueryParam('p');
          }}
        />
      </div>

      <div className='mt-4 h-full border  rounded-xl p-5	card_shadow border_color'>
        <Table
          className='-mt-2.5 '
          data={dataSource.data}
          total={dataSource.total}
          current={current}
          columns={columns}
          loading={loading}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
