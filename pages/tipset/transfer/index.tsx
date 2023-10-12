/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery';
import useUpdateQuery from '@/components/hooks/useUpdateQuery';
import { message_list, transfer_list } from '@/contents/tipset';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import { formatNumber, pageLimit } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useAxiosData from '@/store/useAxiosData';
import styles from './index.module.scss'
import classNames from 'classnames';

export default () => {
  const { tr } = Translation({ ns: 'tipset' });
  const { theme, lang } = useFilscanStore();
  const updateQuery = useUpdateQuery();
  const removeQueryParam = useRemoveQueryParam();
  const { axiosData,loading } = useAxiosData();
  const { p } = useRouter().query;
  // const [loading, setLoading] = useState(false);
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

  const load = async (cur?: number) => {
    // setLoading(true);
    const showIndex = cur || current;
    const result: any = await axiosData(apiUrl.tipset_transfer, {
      filters: {
        index: showIndex - 1,
        limit: pageLimit,
      },
    });
    //setLoading(false);
    setDataSource({
      data: result?.large_transfer_list || [],
      total: result?.total_count,
    });
  };

  const columns = useMemo(() => {
    const content = transfer_list.columns.map((v: any) => {
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
    <div className={classNames(styles['transfer-list'],'main_contain')}>
      <div className='flex justify-between items-center'>
        <div className='mx-2.5'>
          <div className='font-PingFang font-semibold text-lg'>
            {tr('transfer_list')}
          </div>
          <div className='text_des text-xs'>
            {tr('transfer_total_list', { value:formatNumber(dataSource?.total||0) })}
          </div>
        </div>

      </div>

      <div className={classNames('mt-4 h-full border  rounded-xl p-5	card_shadow border_color',styles['table'])}>
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
