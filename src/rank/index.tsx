/** @format */

import { useHash } from '@/components/hooks/useHash';
import { Translation } from '@/components/hooks/Translation';
import { useEffect, useMemo, useState } from 'react';
import { getColumn, getDefaultSort } from '@/contents/rank';
import Table from '@/packages/Table';
import fetchData from '@/store/server';
import { apiUrl } from '@/contents/apiUrl';
import Header from './header';
import { useFilscanStore } from '@/store/FilscanStore';
import { pageLimit } from '@/utils';
import { useTranslation } from 'react-i18next';
import useAxiosData from '@/store/useAxiosData';

const defaultFilter = {
  sector_size: 'all',
  interval: '24h',
};
const defaultData = {
  dataSource: [],
  total: 0,
};

export default ({ origin }: { origin: string }) => {
  const { hash } = useHash();
  // const { tr } = Translation({ ns: 'rank' });

  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns: 'rank' });
  };
  const { theme, lang } = useFilscanStore();

  const [active, setActive] = useState('provider');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<any>({});
  const [data, setData] = useState({ ...defaultData });
  const [poolData, setPoolData] = useState({ ...defaultData });
  const [growthData, setGrowthData] = useState({ ...defaultData });
  const [rewardsData, setRewardsData] = useState({ ...defaultData });
  const [current, setCurrent] = useState(1);
  const [headerFilter, setHeaderFilter] = useState<any>();
  const [sort, setSort] = useState<any>({});
  const { axiosData } = useAxiosData();

  useEffect(() => {
    const showHash = hash || 'provider';
    if (showHash === 'growth' || showHash === 'rewards') {
      setHeaderFilter({ ...defaultFilter });
    }
    setActive(showHash);
    setCurrent(1);
    setSort({});
    load(
      showHash,
      1,
      {
        field: getDefaultSort[showHash],
        order: 'descend',
      },
      defaultFilter
    );
  }, [hash]);

  const load = async (
    tab?: string,
    cur?: number,
    orders?: any,
    filter?: any
  ) => {
    const showActive = tab || active;
    if (showActive) {
      const index = cur || current;
      const showOrder = orders ||
        (sort.field && sort) || {
          field: getDefaultSort[showActive],
          order: 'descend',
        };

      const showFilter = filter || headerFilter;
      setLoading(true);
      const linkUrl: any = `rank_${showActive}`;
      const filters = showFilter
        ? {
            ...showFilter,
            sector_size:
              showFilter?.sector_size === 'all'
                ? null
                : showFilter?.sector_size || '',
          }
        : {};
      const data: any = await axiosData(apiUrl[linkUrl], {
        index: index - 1,
        limit: origin === 'home' ? 7 : pageLimit,
        order: {
          field: showOrder.field,
          sort: showOrder.order === 'ascend' ? 'asc' : 'desc',
        },
        ...filters,
      });
      setLoading(false);
      if (data) {
        const showData = data?.items || [];
        if (
          showOrder.field === getDefaultSort[showActive] &&
          showOrder.order === 'descend' &&
          showActive !== 'rewards'
        ) {
          setProgress({
            ...progress,
            [showActive]:
              showData.length > 0
                ? showData[0][getDefaultSort[showActive]]
                : '',
          });
        }
        if (showActive === 'pool') {
          setPoolData({
            dataSource: showData,
            total: data?.total || 0,
          });
        } else if (showActive === 'growth') {
          setGrowthData({
            dataSource: showData,
            total: data?.total || 0,
          });
        } else if (showActive === 'rewards') {
          setRewardsData({
            dataSource: showData,
            total: data?.total || 0,
          });
        } else {
          setData({
            dataSource: showData,
            total: data?.total || 0,
          });
        }
      }
    }
  };

  const columns = useMemo(() => {
    const content: any = [];
    getColumn(active, progress[active]).forEach((item) => {
      content.push({ ...item, title: tr(item.title) });
    });
    return content;
  }, [active, progress[active], theme, tr]);

  const handleHeaderChange = (type: string, value: string) => {
    console.log('---4', type, value);
    let newActive = active;
    let activeHeader = headerFilter;
    if (type === 'active') {
      newActive = value;
      setActive(value);
      setHeaderFilter({ ...defaultFilter });
      activeHeader = { ...defaultFilter };
    } else {
      activeHeader = {
        ...headerFilter,
        [type]: value,
      };
      setHeaderFilter(activeHeader);
    }

    setCurrent(1);
    load(newActive, 1, undefined, activeHeader);
  };

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let cur: number = pagination.current || current;
    let order = { ...sort };
    if (sorter.field) {
      order = {
        field: sorter.field,
        order: sorter.order,
      };
    }
    setCurrent(cur);
    setSort(order);
    load(active, cur, order);
  };

  const showData = useMemo(() => {
    if (active === 'provider') return data;
    if (active === 'pool') return poolData;
    if (active === 'growth') return growthData;
    if (active === 'rewards') return rewardsData;
    return data;
  }, [active, data, poolData, growthData, rewardsData]);

  return (
    <>
      {origin !== 'home' && (
        <div className='font-xl font-semibold mb-2.5'>{tr('rank')}</div>
      )}
      <Header origin={origin} active={active} onChange={handleHeaderChange} />
      <div
        className={`mt-4 ${
          origin === 'home' ? 'h-[481px]' : 'h-full'
        } border  rounded-xl p-5	card_shadow border_color flex items-center`}>
        <Table
          className='-mt-2.5 '
          key={active}
          data={showData.dataSource}
          total={origin === 'home' ? 0 : showData.total}
          columns={columns}
          loading={loading}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
