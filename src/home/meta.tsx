/** @format */

import { EvmContractSummary, apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import { home_meta } from '@/contents/home';
import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import useAxiosData from '@/store/useAxiosData';
import Skeleton from '@/packages/skeleton';

//type A = (typeof home_meta)[number]['dataIndex'] --> Record<A,number|undefined>

type ElementType<T extends readonly any[]> =
  T extends readonly (infer ElementType)[] ? ElementType : never;
type DataIndex = ElementType<typeof home_meta>['dataIndex'];

type Item = ElementType<typeof home_meta>;

// const mockData: Record<DataIndex, number | undefined> & {
//   [key: string]: number | undefined;
// } = {
//   power_increase_24h: 3740899077455872,
//   increase_24h: -46.23,
//   add_power_in_32g: 6732636259164418311,
//   miner_initial_pledge: 6732636359164418311,
//   fil_per_tera_24h: 374089907741648311,
//   total_contract: 5678.9012,
//   contract_24h: 123,
//   contract_transaction: 6789.0123,
//   contract_address: 7890.1234,
//   gas_24: 8901.2345,
// };
function Meta() {
  const { tr } = Translation({ ns: 'home' });
  const { axiosData} = useAxiosData()
  // const ref = useObserver();

  const [data, setData] = useState<
    Record<DataIndex, number | undefined> & {
      [key: string]: number | undefined;
    }
    >();
  const [contractData,setContractData] = useState<Record<string,any>>()

  useEffect(() => {
    //loadInterval();
    load();

  }, []);

  const load = async () => {
    const data: any = await axiosData(apiUrl.home_meta);
    setData(data?.total_indicators || {});
    const result: any = await axiosData(EvmContractSummary);
    setContractData(result || {})
    //setData(data?.total_indicators || {});
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
        const value = (data && data[dataIndex]) ||contractData&&contractData[dataIndex] ||'';
        let renderDom = value;
        if (item.tipContent && Array.isArray(item.tipContent)) {
          const content = <>
          </>
        }
        if (data) {
          renderDom = render && render(value, {...data,...contractData});
        }
        return (
          <div className={styles['meta-item']} key={item.dataIndex}>
            <div className='text_clip DINPro-Bold font-bold	 text-xl'>
              { !value && <Skeleton />}
              {renderDom}
            </div>
            <div className='text-xs text_des mt-1 font-PingFang'>{tr(title)}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Meta;
