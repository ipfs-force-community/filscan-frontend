/** @format */

import { EvmContractSummary, apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import { home_meta } from '@/contents/home';
import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import useAxiosData from '@/store/useAxiosData';
import Skeleton from '@/packages/skeleton';
import Tooltip from '@/packages/tooltip';
import useInterval from '@/components/hooks/useInterval';

type ElementType<T extends readonly any[]> =
  T extends readonly (infer ElementType)[] ? ElementType : never;
type DataIndex = ElementType<typeof home_meta>['dataIndex'];

type Item = ElementType<typeof home_meta>;

function Meta() {
  const { tr } = Translation({ ns: 'home' });
  const { axiosData} = useAxiosData()

  const [data, setData] = useState<
    Record<DataIndex, number | undefined> & {
      [key: string]: number | undefined;
    }
    >();
  const [contractData, setContractData] = useState<Record<string, any>>()

  useInterval(() => {
    load();
  }, 5*60*1000);

  const load = async () => {
    const data: any = await axiosData(apiUrl.home_meta);
    setData(data?.total_indicators || {});
    const result: any = await axiosData(EvmContractSummary);
    setContractData(result || {})
  };

  // useInterval(() => {
  //   loadInterval();
  // }, 15000);

  const loadInterval = async () => {
    const lastData = await axiosData(apiUrl.tipset_chain_FinalHeight);
    // postAxios(apiUrl.tipset_chain_FinalHeight).then((res: any) => {
    //   const data = res?.result || {};
    //   setLast({
    //     latest_height: data.height,
    //     latest_block_time: data.block_time,
    //   });
    // });
  };

  return (
    <div
      //ref={ref}

      className={classNames(styles.meta,`border card_shadow flex-1 items-center h-[270px] inline-grid grid-cols-4 gap-2 pl-10 pr-6  py-10 rounded-xl border_color overflow-hidden`)} >
      {home_meta.map((item: Item|any, index: number) => {
        const { render, dataIndex, title } = item;
        const dataSource = {...data,...contractData}
        const value = (dataSource && dataSource[dataIndex]) ||'';
        let renderDom = value;
        let tipContent;
        if (item.tipContent && Array.isArray(item.tipContent)) {
          tipContent = <ul className='px-2 pt-2 w-fit'>
            {item.tipContent.map((tipItem: any) => {
              let tipValue = dataSource[tipItem.dataIndex];
              if (tipItem.render) {
                tipValue =tipItem.render(tipValue,dataSource)
              }
              return <li key={tipItem.dataIndex} className='mb-2.5'>
                <span className='min-w-[80px] w-fit'>{tr(tipItem.title)}:</span>
                <span className='w-fit ml-1'>{tipValue}</span>
              </li>
            })}
          </ul>
        }
        if (data) {
          renderDom = render && render(value, {...data,...contractData});
        }
        if (item.tipContent) {
          return <div className={`${styles['meta-item']} cursor-pointer relative`} key={item.dataIndex}>
            <Tooltip context={tipContent} icon={false}>
              <div className='text_clip DINPro-Bold font-bold	 text-xl'>
                {!value && <Skeleton />}
                {renderDom}
              </div>
            </Tooltip>

            <div className='flex items-center gap-x-1 text-xs text_des mt-1 font-PingFang'>
              {tr(title)}
              { item.tip && <Tooltip context={tr(item.tip)} icon={true}/>}
            </div>
          </div>
        }
        return (
          <div className={styles['meta-item']} key={item.dataIndex}>
            <div className='text_clip DINPro-Bold font-bold	 text-xl'>
              { !value && <Skeleton />}
              {renderDom}
            </div>
            <div className='flex items-center gap-x-1 text-xs text_des mt-1 font-PingFang'>
              {tr(title)}
              { item.tip && <Tooltip context={tr(item.tip)} icon={true}/>}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Meta;
