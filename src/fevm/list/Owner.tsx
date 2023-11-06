/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import Table from '@/packages/Table';
import { useFilscanStore } from '@/store/FilscanStore';
import { formatNumber, pageLimit } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import useAxiosData from '@/store/useAxiosData';
import styles from './Owner.module.scss'
import {
  nft_owner_columns,
  token_owner_columns,
} from '@/contents/contract';
import useWindow from '@/components/hooks/useWindown';
import Copy from '@/components/copy';
import Link from 'next/link';
import classNames from 'classnames';
import Selects from '@/packages/selects';
import { BrowserView, MobileView } from '@/components/device-detect';

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
  const [loadingTable, setTableLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState(1);
  const [ownerList, setOwner] = useState({});
  const [toList, setTo] = useState({});
  const [selectValue, setSelectValue] = useState('all')
  const {isMobile} = useWindow()

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id,type]);

  const load = async (cur?: number,filter?:string) => {
    setTableLoading(true);
    const index = cur || current;
    const showFilter = filter || selectValue;
    const axiosUrl = type === 'nfts' ? apiUrl.contract_NFTOwners : apiUrl.contract_ERC20Owner;
    const result = await axiosData(axiosUrl, {
      contract_id: id,
      contract:id,
      page: index - 1,
      limit: pageLimit,
      filter:showFilter === 'all' ? '':showFilter
    });
    setTableLoading(false);
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
    const newColumns = type === 'nfts' ? nft_owner_columns : token_owner_columns;
    return newColumns(ownerList).map((v) => {
      const ol = ownerList as any
      if (type !== 'nfts' && isMobile) {
        if (v.dataIndex === 'rank' ) {
          v.render= (value: string) => <span className={styles.rank}>{value}</span>
        }
        if (v.dataIndex === 'owner') {
          v.render = (value:string) =>{
            if (!value) return '--';
            return (
              <span className={classNames(styles.owner,'link_text')}>
                <span> {value}</span>
                {value && <Copy text={value} />}
                {ol?.domains && ol?.domains[value] && (
                  <Link
                    href={`/domain/${ol.domains[value]}?provider=${ol.provider}`}>
                ({ol.domains[value]})
                  </Link>
                )}
              </span>
            );
          }
        }
      }
      return { ...v, title: tr(v.title) };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, tr, ownerList, toList]);

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let cur: number = pagination.current || current;
    setCurrent(cur);
    load(cur);
  };
  return (
    <>

      <span className='text_des text-sm ml-2.5'>
        {tr('owner_total', { value: formatNumber(data?.total||0)})}
      </span>
      <BrowserView>
        {type === 'token' &&<Selects
          className={styles.selectTab }
          value={ selectValue}
          options={[
            { label: tr('all'), value: 'all' },
            { label: '>0', value: '>0' },
            {label:'=0',value:'=0'},
          ]}
          onChange={(value) => {
            setSelectValue(value)
            setCurrent(1)
            load(1,value)
          }}
        />}
      </BrowserView>
      <MobileView>
        {type === 'token' &&<Selects
          className={styles.selectMobileTab }
          value={ selectValue}
          options={[
            { label: tr('all'), value: 'all' },
            { label: '>0', value: '>0' },
            {label:'=0',value:'=0'},
          ]}
          onChange={(value) => {
            setSelectValue(value)
            setCurrent(1)
            load(1,value)
          }}
        />}
      </MobileView>
      <div className='card_shadow p-5 mt-2.5 rounded-xl border border_color'>
        <Table
          data={data.dataSource}
          total={data.total}
          current={current}
          columns={columns}
          loading={loadingTable}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
