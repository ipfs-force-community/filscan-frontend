/** @format */

import { useHash } from '@/components/hooks/useHash';
import { Translation } from '@/components/hooks/Translation';
import { useEffect, useMemo, useState } from 'react';
import { providerList } from '@/contents/rank';
import Table from '@/packages/Table';
import fetchData from '@/store/server';
import { apiUrl } from '@/apiUrl';

export default () => {
  const hash = useHash();
  const { tr } = Translation({ ns: 'rank' });

  const [active, setActive] = useState('provider');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    setActive(hash);
    load();
  }, [hash]);

  const load = async (tab?: string, cur?: number) => {
    const showActive = tab || active;
    if (showActive) {
      const index = cur || current;
      setLoading(true);
      setData([]);
      const linkUrl: any = `rank_${showActive}`;
      const data: any = await fetchData(apiUrl[linkUrl], {
        index: index - 1,
        limit: 7,
      });
      setLoading(false);
      console.log(data);
      setData(data?.items || []);
    }
  };

  const columns = useMemo(() => {
    let content = [];
    switch (active) {
      case 'provider':
        content = providerList(progress).map((item) => {
          console.log('===3', item.title, tr(item.title));
          return { ...item, title: tr(item.title) };
        });
        break;
      case 'pool':
        content = [];
        break;
      case 'growth':
        content = providerList(progress);
        break;
      case 'rewards':
        content = providerList(progress);
        break;
      default:
        break;
    }
    return content;
  }, [active]);

  console.log('====354345', columns);
  const handleChange = () => {
    console.log('====3');
  };

  return (
    <div className='mt-5 border h-[481px] border-border rounded-xl p-5	default_card_shadow'>
      <Table
        className='-mt-2.5'
        key={active}
        data={data}
        columns={columns}
        loading={loading}
        onChange={handleChange}
      />
    </div>
  );
};
