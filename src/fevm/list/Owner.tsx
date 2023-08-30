/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import { detailPageLimit } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import useAxiosData from '@/store/useAxiosData';
import {
  token_owner_columns,
  token_transfer_columns,
} from '@/contents/contract';

export default ({
  type,
  id,
}: {
  type: string;
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
  const [ownerList, setOwner] = useState({});
  const [toList, setTo] = useState({});

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id,type]);

  const load = async (cur?: number) => {
    setLoading(true);
    const index = cur || current;
    const axiosUrl = type === 'nfts' ? apiUrl.contract_NFTOwners : apiUrl.contract_ERC20Owner;
    const result = await axiosData(axiosUrl, {
      contract_id: id,
      page: index - 1,
      limit: detailPageLimit,
    });
    setLoading(false);
    setData({
      dataSource: result?.items || [],
      total: result?.total || 0,
    });
    if (result?.items && result.items.length > 0) {
      const formItems = result?.items.map((v: any) => v.owner);
      loadFnsUrl(formItems, 'owner');
    }
  };

  const loadFnsUrl = async (items: Array<any>, type: string) => {
    if (items.length > 0) {
      const fnsData = await axiosData(`${apiUrl.contract_fnsUrl}`, {
        addresses: items,
      });
      setOwner(fnsData);
    }
  };

  const columns = useMemo(() => {
    return token_owner_columns(ownerList).map((v) => {
      return { ...v, title: tr(v.title) };
    });
  }, [theme, tr, ownerList, toList]);

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let cur: number = pagination.current || current;
    setCurrent(cur);
    load(cur);
  };
  return (
    <>
      <span className='text_des text-sm'>
        {tr('owner_total', { value: data.total })}
      </span>
      <div className='card_shadow p-5 mt-5 '>
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
