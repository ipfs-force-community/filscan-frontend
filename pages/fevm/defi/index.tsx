import { Translation } from "@/components/hooks/Translation";
import { apiUrl } from "@/contents/apiUrl"
import { defi_market } from "@/contents/fevm";
import useAxiosData from "@/store/useAxiosData";
import DefiList from '@/src/fevm/defi'
import { formatDateTime, get$Number } from "@/utils";
import { data } from "autoprefixer";
import { BrowserView, MobileView } from "@/components/device-detect";
import classNames from "classnames";
import styles from './index.module.scss'
export default () => {
  const { data: defiData, loading } = useAxiosData(apiUrl.fevm_defiSummary);
  const { tr } = Translation({ ns: 'fevm' });

  return <div className={classNames("main_contain",styles.wrap)}>
    <MobileView>
      <div>
        {defi_market.filter((value)=>{
          return value.dataIndex === 'fevm_staked'
        }).map((value,index)=>{
          const data = defiData&&defiData[value.dataIndex];
          return <div className={classNames(styles['staked-top'])} key={index}>
            <div className={styles.content}>
              <div className={styles.value}>{get$Number(data)}</div>
              <div className={styles.title}>{tr(value.title)}</div>
            </div>
          </div>
        })}
      </div>
      <div className={classNames(styles['staked-bottom'])}>
        {defi_market.filter((value)=>{
          return value.dataIndex !== 'fevm_staked'
        }).map((value,index)=>{
          const data = defiData&&defiData[value.dataIndex];
          return <div className={classNames(styles.content)} key={index}>
            <div className={styles.value}>{get$Number(data)}</div>
            <div className={styles.title}>{tr(value.title)}</div>
          </div>
        })}
      </div>
    </MobileView>
    <BrowserView>
      <ul className="flex p-5 border border_color card_shadow rounded-xl h-[104px] items-center">
        {defi_market.map(item => {
          const { title, dataIndex, render } = item;
          const value = defiData&&defiData[dataIndex];
          const showValue = render ? render(value,defiData):value
          return <li className="flex-1 flex items-center justify-center border-r border_color last:border-0" key={ item.dataIndex}>
            <span className="flex flex-col w-fit " >
              <span className="text-sm font-DIN mb-2.5 text_des">{tr(title)}</span>
              <span className="text-xl font-DINPro-Bold">{ showValue}</span>
            </span>
          </li>
        })}
      </ul>
      <div className="mt-5">
        <span className="mx-2.5">
          <span className="text-lg font-DINPro-Bold "> {tr('defi_overview')}</span>
          { defiData?.updated_at &&<span className="text_des text-xs ml-2">{tr('defi_list_time', {value:formatDateTime(defiData?.updated_at)}) }</span>}
        </span>
        <DefiList />
      </div>
    </BrowserView>
    <MobileView>
      <DefiList />
    </MobileView>
  </div>
}