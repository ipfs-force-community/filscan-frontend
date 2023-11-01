import { Translation } from "@/components/hooks/Translation";
import useInterval from "@/components/hooks/useInterval";
import { EvmContractSummary, apiUrl, metaOther } from "@/contents/apiUrl";
import { meta_list } from "@/contents/home"
import Tooltip from "@/packages/tooltip";
import useAxiosData from "@/store/useAxiosData";
import { getSvgIcon } from "@/svgsIcon";
import { data } from "autoprefixer";
import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from './Meta.module.scss'
export default () => {
  const { tr } = Translation({ ns: 'home' });
  const {axiosData } = useAxiosData();
  const [data, setData] = useState<any>({})
  const [otherData, setOtherData] = useState({})
  const [contractData, setContractData] = useState<Record<string, any>>()

  useInterval(() => {
    load();
    loadOther();
  }, 5*60*1000);

  const load = async () => {
    const data: any = await axiosData(apiUrl.home_meta);
    setData(data?.total_indicators || {});
    const result: any = await axiosData(EvmContractSummary);
    setContractData(result || {})
  };

  const loadOther = async () => {
    const otherData: any = await axiosData(metaOther);
    setOtherData(otherData || {});
  }

  return <ul className={classNames("flex flex-wrap gap-5 card_shadow py-5 px-6 border border_color rounded-[12px] mt-[46px]",styles.wrap,styles['wrap-reset'])}>
    {meta_list.map((item: any, index: number) => {
      const { title,tip, render, dataIndex } = item;
      const newData = {...contractData,...data,...otherData}
      const value = newData[dataIndex];
      let renderDom = render ? render(value, newData, tr) : value;
      return <li className={classNames("flex flex-col items-center w-[210px] py-4 gap-y-1 border border_color rounded-[5px]",styles.item,styles['item-reset'])} key={index}>
        <div className="font-medium font-DINPro-Bold text-base">{renderDom}</div>
        {tip ?
          <>
            <Tooltip context={tr(tip)} icon={ false}>
              <div className="text_des flex items-center gap-x-1">
                <span>
                  {tr(item.title)}
                </span>
                { getSvgIcon('tip')}
              </div>
            </Tooltip>
          </>: <div className="text_des text-center ">{tr(item.title)}</div>
        }
      </li>
    })}
  </ul>
}