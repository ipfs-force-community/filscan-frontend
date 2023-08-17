/** @format */

import { apiUrl } from '@/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery';
import useUpdateQuery from '@/components/hooks/useUpdateQuery';
import { pool_list } from '@/contents/tipset';
import { Item } from '@/contents/type';
import Table from '@/packages/Table';
import Select from '@/packages/select';
import Selects from '@/packages/selects';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { pageLimit } from '@/utils';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';

export default () => {
  const { tr } = Translation({ ns: 'tipset' });
  const { theme, lang } = useFilscanStore();
  const updateQuery = useUpdateQuery();
  const removeQueryParam = useRemoveQueryParam();
  const { name, p } = useRouter().query;
  const [loading, setLoading] = useState(false);
  const [headerOptions, setHeaderOptions] = useState<Array<any>>([]);
  const [dataSource, setDataSource] = useState({
    data: [],
    total: undefined,
  });

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
    loadOptions();
  }, [lang]);

  const loadOptions = async () => {
    const result: any = await fetchData(apiUrl.tipset_message_pool_opt);
    const obj = result?.method_name_list || {};
    const options = Object.keys(obj).map((v: string) => {
      return { value: v, label: tr(v) };
    });
    options.unshift({
      label: `${tr('all')}`,
      value: 'all',
    });
    setHeaderOptions(options);
  };

  useEffect(() => {
    load(current, method);
  }, [method, current]);

  const load = async (cur?: number, method?: string) => {
    setLoading(true);
    const showIndex = cur || current;
    const method_name = method === 'all' ? '' : method;
    const result: any = await fetchData(apiUrl.tipset_message, {
      filters: {
        index: showIndex - 1,
        limit: pageLimit,
        method_name,
      },
    });
    setLoading(false);
    setDataSource({
      data: result?.message_list || [],
      total: result?.total_count,
    });
  };

  const columns = useMemo(() => {
    const content = pool_list.columns.map((v: any) => {
      return { ...v, title: tr(v.title) };
    });
    return content;
  }, [theme, lang]);

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
            {tr('pool_list')}
          </div>
          <div className='text_des text-xs'>
            {tr(pool_list.total_list, { value: dataSource.total })}
          </div>
        </div>
        <Selects
          className='w-[240px]'
          value={method}
          options={headerOptions}
          onChange={(value) => {
            if (value !== 'all') {
              updateQuery({ name: value });
            } else {
              removeQueryParam('name');
            }
          }}
        />
      </div>

      <div className='mt-4 h-full border  rounded-xl p-5	card_shadow border_color'>
        <Table
          className='-mt-2.5 '
          data={dataSource.data}
          total={dataSource.total}
          columns={columns}
          loading={loading}
          current={current}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
