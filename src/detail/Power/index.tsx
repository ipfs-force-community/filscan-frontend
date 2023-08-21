/** @format */

import { Translation } from '@/components/hooks/Translation';
import { power_list } from '@/contents/detail';
import SkeletonScreen from '@/packages/skeleton';
import { useFilscanStore } from '@/store/FilscanStore';
import { getShowData } from '@/utils';
import { useMemo } from 'react';

export default ({ data }: { data: any }) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'detail' });

  const loading = useMemo(() => {
    if (data.account_indicator) {
      return false;
    }
    return true;
  }, [data?.account_indicator]);

  return (
    <div className='w-1/2 border-l border_color p-7'>
      <ul className='flex gap-x-20'>
        {power_list.header.map((headerItem) => {
          const { render, dataIndex, title } = headerItem;
          const showData = getShowData(headerItem, data);

          const value = render
            ? render(showData[dataIndex])
            : showData[dataIndex] || '--';

          return (
            <li>
              <span className='text-sm text_des'>{tr(title)}</span>
              <span>{loading ? <SkeletonScreen /> : value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
