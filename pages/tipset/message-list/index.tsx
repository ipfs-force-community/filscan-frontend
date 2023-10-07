/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery';
import useUpdateQuery from '@/components/hooks/useUpdateQuery';
import { message_list } from '@/contents/tipset';
import Table from '@/packages/Table';
import Selects from '@/packages/selects';
import { useFilscanStore } from '@/store/FilscanStore';
import { formatNumber, pageLimit } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useAxiosData from '@/store/useAxiosData';
import styles from './index.module.scss'
import classNames from 'classnames';
import Select from '@/packages/select';

export default () => {
  const { tr } = Translation({ ns: 'tipset' });
  const { theme, lang } = useFilscanStore();
  const updateQuery = useUpdateQuery();
  const removeQueryParam = useRemoveQueryParam();
  const { axiosData } = useAxiosData();
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
    const result: any = await axiosData(apiUrl.tipset_message_opt);
    const obj = result?.method_name_list || {};
    const options = Object.keys(obj).map((v: string) => {
      return { value: v, label: tr(v) };
    });
    options.unshift({
      label: `all`,
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
    const result: any = await axiosData(apiUrl.tipset_message, {
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
    const content = message_list.columns.map((v: any) => {
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

  const newOptions = useMemo(() => {
    return headerOptions?.map(v => {
      return {...v,label:tr(v.value)}
    })
  }, [lang, headerOptions])

  return (
    <div className={classNames(styles['message-list'],'main_contain')}>
      <div className={classNames('flex justify-between items-center mx-2.5',styles['title-wrap'])}>
        <div>
          <div className='font-PingFang font-semibold text-lg'>
            {tr('message_list')}
          </div>
          <div className='text_des text-xs'>
            {tr(message_list.total_list, { value: formatNumber(dataSource?.total||0) })}
          </div>
        </div>
        <Selects
          value={method}
          options={newOptions}
          className={classNames('!min-w-[240px]',styles.select)}
          // className='custom-select'
          onChange={(value) => {
            if (value !== 'all') {
              updateQuery({ name: value, p: 'removed' });
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
          current={current}
          total={dataSource.total}
          columns={columns}
          loading={loading}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
