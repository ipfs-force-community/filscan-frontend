/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import Segmented from '@/packages/segmented';
import SkeletonScreen from '@/packages/skeleton';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { getShowData } from '@/utils';
import { useEffect, useState } from 'react';
import styles from './style.module.scss'
import classNames from 'classnames';
import Tooltip from '@/packages/tooltip';
import { getSvgIcon } from '@/svgsIcon';
import useAxiosData from '@/store/useAxiosData';

//统计指标

export default ({
  overView,
  accountId,
}: {
  overView: any;
  accountId?: string | string[];
}) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'detail' });
  const {axiosData } = useAxiosData();
  const [interval, setInterval] = useState('24h');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  //   useColumnAlign('.overView', '.overView_item', 'last_item');

  useEffect(() => {
    if (accountId) {
      load();
    }
  }, [accountId]);

  const load = async (inter?: string) => {
    setLoading(true);
    const show_inter = inter || interval;
    const result: any = await axiosData(apiUrl.detail_Indicators, {
      account_id: accountId,
      filters: {
        interval: show_inter,
      },
    });
    setLoading(false);
    setData(result?.miner_indicators || {});
  };

  const handleTabChange = (value: string) => {
    setInterval(value);
    load(value);
  };

  return (
    <div className={classNames(styles.overview,'w-full')}>
      <div className='w-full flex items-center mt-7 mb-5 ml-2.5'>
        <span className='text-lg font-semibold mr-5'>{tr(overView.title)}</span>
        <Segmented
          data={overView.tabList}
          ns='detail'
          defaultValue={interval}
          isHash={false}
          onChange={handleTabChange}
        />
      </div>
      <ul
        className={classNames(styles.list, 'card_shadow p-5 h-[150px] py-7 px-5 grid rounded-xl border border_color gap-y-6')} >
        {overView?.list.map((item: any) => {
          const { render, dataIndex, style = {}, width, title,title_tip } = item;
          const showData = getShowData(item, data);
          const value = render
            ? render(showData[dataIndex])
            : showData[dataIndex] || '--';
          //style={{ ...style }}
          return (
            <li key={dataIndex} className={classNames(styles['list-row'], 'flex')}>

              <span className='text-sm text_des min-w-20 flex flex-wrap'>
                {title_tip ? <Tooltip context={tr(title_tip)} icon={false} >
                  <span className='flex items-center gap-x-1 cursor-pointer'>{tr(title)} {getSvgIcon('tip')}:</span>
                </Tooltip> : `${tr(title)}:`}
              </span>
              <span className='font-DINPro-Medium text-sm font-medium ml-1'>
                {loading ? <SkeletonScreen /> : value}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
