import { Translation } from "@/components/hooks/Translation";
import { useHash } from "@/components/hooks/useHash";
import { chartsNav } from "@/contents/statistic"
import { Menu_Info } from "@/contents/type";
import { getSvgIcon } from "@/svgsIcon";
import PowerTrend from '@/src/statistics/Trend'
import BlockRewardTrend from "@/src/statistics/BlockRewardTrend";
import BlockRewardPer from "@/src/statistics/BlockRewardPer";
import ActiveNodeTrend from "@/src/statistics/ActiveNodeTrend";
import Link from "next/link";
import FilChart from "@/src/statistics/FilChart";
import Charts from "@/src/statistics/Charts";
import DCCTrend from "@/src/statistics/DCCTrend";
import classNames from "classnames";
import { BrowserView } from "@/components/device-detect";
import styles from './index.module.scss'
export default () => {
  const { tr } = Translation({ ns: 'static' });
  const { hash } = useHash()

  const renderNavChildren = (itemChildren: Array<Menu_Info>) => {
    return <ul className="flex flex-col w-full" >
      {itemChildren.map((child:Menu_Info) => {
        return <Link key={child.key}
          href={`/statistics/charts#${child.key}`}
          scroll={false}
          className={`flex items-center gap-x-2 p-2 w-full pl-10 h-10 text_color hover:bg-bg_hover rounded-[5px] ${hash === child.key ? 'text-primary bg-bg_hover' : ''}`}>
          {tr(child?.title || child.key)}</Link>
      })}
    </ul>
  }
  return <div className={classNames(styles['statistics-charts'],"main_contain !overflow-auto")}>
    <div className="flex gap-x-5">
      <BrowserView>
        <div className="w-[209px]">
          <div className='flex justify-center h-10 flex-col text-lg font-medium gap-y-2.5 mb-2.5 mx-2.5'>
            <span>{tr('static_overview')}</span>
          </div>
          <ul className="flex flex-col py-4 h-fit card_shadow border border_color rounded-xl cursor-pointer" >
            {chartsNav.map(item => {
              const { preIcon,title,key } = item;
              return <div key={item.key} className="relative flex flex-col w-full px-4 items-center font-DINPro-Medium" >
                <Link key={item.key}
                  href={`/statistics/charts#${item.key}`}
                  scroll={false}
                  className={`flex items-center gap-x-2 w-full h-10 px-2.5 text_color hover:bg-bg_hover rounded-[5px] ${hash === item.key ? 'text-primary bg-bg_hover' : ''}`}>
                  {preIcon && getSvgIcon(preIcon)}
                  {tr(title||key)}
                </Link>
                {item.children && renderNavChildren(item.children)}
              </div>
            })}
          </ul>
        </div>
      </BrowserView>

      <div className="flex flex-1 flex-col gap-y-6 ">
        {hash === 'fil_overview' ? <>
          <FilChart />
          <Charts />
        </> : <>
          <PowerTrend />
          <DCCTrend />
          <BlockRewardTrend />
          <BlockRewardPer />
          <ActiveNodeTrend />
        </>}
      </div>
    </div>
  </div>

}