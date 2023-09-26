/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import { cid_list, message_list } from '@/contents/detail';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import { pageLimit } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import useAxiosData from '@/store/useAxiosData';
import Selects from '@/packages/selects';
import useUpdateQuery from '@/components/hooks/useUpdateQuery';
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery';
import { useHash } from '@/components/hooks/useHash';

export default ({
  methodName,
  cid,
  options
}: {
  methodName?: string;
                            cid?: string | string[];
  options:Array<any>
}) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'detail' });
  const updateQuery = useUpdateQuery();
  const removeQueryParam = useRemoveQueryParam();
  const { hash, hashParams } = useHash();
  const { name, p } = hashParams || {};

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
    return cid_list.columns(fromList, toList).map((v) => {
      return { ...v, title: tr(v.title) };
    });
  }, [theme, lang, fromList, toList]);

  const method = useMemo(() => {
    if (name && typeof name === 'string') {
      return name;
    }
    return 'all';
  }, [name]);

  useEffect(() => {
    if (cid) {
      setCurrent(1)
      load(1);
    }
  }, [cid, method]);

  const load = async (cur?: number) => {
    setLoading(true);
    const showIndex = cur || current;
    const showMethod = method;
    const result: any = await axiosData(apiUrl.tipset_Block_messages, {
      block_cid: cid,
      filters: {
        index: showIndex - 1,
        limit: pageLimit,
        method_name: showMethod === 'all' ? '' : showMethod,
      },
    });
    setLoading(false);
    const showList = result?.message_list || [];
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
      <div className='flex justify-between items-center mt-5 mx-2.5'>
        <div>
          <div className='font-PingFang font-semibold text-lg'>
            {tr('blk_cids_message')}
          </div>
          <div className='text_des'>{tr('message_list_total', { value: data.total })}</div>
        </div>
        <Selects
          className='!min-w-[240px]'
          value={method}
          options={options}
          onChange={(value) => {
            if (value !== 'all') {
              updateQuery({ name: value });
            } else {
              removeQueryParam('name');
            }
          }}
        />
      </div>
      <div className='card_shadow p-5 mt-5 min-h-[200px] border border_color rounded-xl'>
        <Table
          key={'message_list'}
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
