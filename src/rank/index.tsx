/** @format */

import { useHash } from '@/components/hooks/useHash';
import { Translation } from '@/components/hooks/Translation';
import { useEffect, useMemo, useState } from 'react';
import { getColumn, getDefaultSort } from '@/contents/rank';
import Table from '@/packages/Table';
import fetchData from '@/store/server';
import { apiUrl } from '@/apiUrl';
import Header from './header';
import { useFilscanStore } from '@/store/FilscanStore';

const defaultFilter = {
  sector_size: 'all',
  interval: '24h',
};

export default ({ origin }: { origin: string }) => {
  const { hash } = useHash();
  const { tr } = Translation({ ns: 'rank' });
  const { theme, lang } = useFilscanStore();

  const [active, setActive] = useState('provider');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<any>({});
  const [data, setData] = useState([]);
  const [poolData, setPoolData] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [rewardsData, setRewardsData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [headerFilter, setHeaderFilter] = useState<any>();
  const [sort, setSort] = useState<any>({});

  useEffect(() => {
    const showHash = hash || 'provider';
    setActive(showHash);
    load(showHash);
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
      const showOrder =
        orders || sort?.field
          ? sort
          : {
              field: getDefaultSort[showActive],
              order: 'descend',
            };
      const showFilter = filter || headerFilter;
      setLoading(true);
      setData([]);
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
      const data: any = await fetchData(apiUrl[linkUrl], {
        index: index - 1,
        limit: 7,
        order: {
          field: showOrder.field,
          sort: showOrder.order === 'ascend' ? 'asc' : 'desc',
        },
        ...filters,
      });
      setLoading(false);
      const showData = data?.items || [];
      if (
        showOrder.field === getDefaultSort[showActive] &&
        showOrder.order === 'descend' &&
        showActive !== 'rewards'
      ) {
        setProgress({
          ...progress,
          [showActive]:
            showData.length > 0 ? showData[0][getDefaultSort[showActive]] : '',
        });
      }
      if (showActive === 'pool') {
        setPoolData(showData);
      } else if (showActive === 'growth') {
        setGrowthData(showData);
      } else if (showActive === 'rewards') {
        setRewardsData(showData);
      } else {
        setData(showData);
      }
    }
  };

  const columns = useMemo(() => {
    let content = getColumn(active, progress[active]).map((item) => {
      return { ...item, title: tr(item.title) };
    });
    return content;
  }, [active, progress[active], theme, lang]);

  const handleHeaderChange = (type: string, value: string) => {
    let newActive = active;
    let activeHeader = headerFilter;
    if (type === 'active' && origin === 'home') {
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
      cur = 1;
    }
    setCurrent(1);
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
      <Header origin={origin} active={active} onChange={handleHeaderChange} />
      <div className='mt-4 h-[491px] border  rounded-xl p-5	card_shadow border_color'>
        <Table
          className='-mt-2.5 '
          key={active}
          data={showData}
          columns={columns}
          loading={loading}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
