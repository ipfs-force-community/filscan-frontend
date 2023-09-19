/** @format */

import { Translation } from '@/components/hooks/Translation';
import { power_list } from '@/contents/detail';
import SkeletonScreen from '@/packages/skeleton';
import { useFilscanStore } from '@/store/FilscanStore';
import { formatNumber, getShowData } from '@/utils';
import { useMemo } from 'react';
import Image from 'next/image';
import powerIcon from '@/assets/images/powerIcon.svg';
import { spawn } from 'child_process';
import { link } from 'fs';
import { BrowserView, MobileView } from '@/components/device-detect';
import styles from './style.module.scss'
import classNames from 'classnames';

export default ({ data }: { data: any }) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'detail' });

  const loading = useMemo(() => {
    if (data.hasOwnProperty('quality_power_percentage')) {
      return false;
    }
    return true;
  }, [data]);

  return (
    <div className={classNames(styles.pow,'w-1/2 h-[300px]  border-l border_color p-7')}>
      <div className='flex justify-between border-b border_color pb-7'>
        <ul className={classNames(styles.row,styles.between,'flex flex-1')}>
          {power_list.header.map((headerItem) => {
            const { render, dataIndex, title } = headerItem;
            const showData = getShowData(headerItem, data);
            const value = render
              ? render(showData[dataIndex])
              : showData[dataIndex] || '--';

            return (
              <li className={classNames(styles.row,'flex flex-col w-1/2')} key={dataIndex}>
                <span className='text-sm text_des'>{tr(title)}</span>
                <>
                  <BrowserView>
                    <span className='text_clip font-DINPro-Bold text-xl	 '>
                      {loading ? <SkeletonScreen /> : value}
                    </span>
                  </BrowserView>
                  <MobileView>
                    <span className={styles.value}>
                      {loading ? <SkeletonScreen /> : value}
                    </span>
                  </MobileView>
                </>
              </li>
            );
          })}
        </ul>
        {/* <BrowserView><Image src={powerIcon} alt='' width={41} height={41} /></BrowserView> */}
      </div>
      <ul className={classNames(styles.column,'mt-9 flex  flex-col flex-wrap gap-y-6 justify-between max-h-[120px]')}>
        {power_list.list.map((item) => {
          const { render, dataIndex, title } = item;
          const showData = getShowData(item, data);
          const value = render
            ? render(showData[dataIndex])
            : showData[dataIndex] || '--';
          return (
            <li key={dataIndex} className={classNames(styles.full,'w-1/2 flex flex-0')}>
              <span className='text-sm text_des w-28'>{tr(title)}</span>
              <span className='font-DINPro-Medium text-sm font-medium'>
                {loading ? <SkeletonScreen /> : value}
              </span>
            </li>
          );
        })}
      </ul>
      <div className={classNames(styles.status,'flex w-full items-center mt-6')}>
        <span className='text-sm text_des w-28'>{tr('sector_status')}</span>
        <span className='font-DINPro-Medium text-sm font-medium'>
          {loading ? (
            <SkeletonScreen />
          ) : (
            <ul className={classNames(styles['status-row'],'flex flex-1 gap-x-4')}>
              {power_list.sector_status.renderList.map((sector_item: any) => {
                const { dataIndex, title, color } = sector_item;
                const showData = getShowData(sector_item, data);
                const value = showData[dataIndex];
                return (
                  <li key={dataIndex} className='flex items-center gap-x-1'>
                    <span
                      className='font-DINPro-Medium text-sm font-medium'
                      style={{ color: color }}>
                      {formatNumber(value)}
                    </span>
                    <span className='text-sm text_des '>{tr(title)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </span>
      </div>
    </div>
  );
};
