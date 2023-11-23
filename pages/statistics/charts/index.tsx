import { Translation } from '@/components/hooks/Translation'
import { useHash } from '@/components/hooks/useHash'
import { chartsNav } from '@/contents/statistic'
import { Menu_Info } from '@/contents/type'
import { getSvgIcon } from '@/svgsIcon'
import PowerTrend from '@/src/statistics/Trend'
import BlockRewardTrend from '@/src/statistics/BlockRewardTrend'
import BlockRewardPer from '@/src/statistics/BlockRewardPer'
import ActiveNodeTrend from '@/src/statistics/ActiveNodeTrend'
import Link from 'next/link'
import FilChart from '@/src/statistics/FilChart'
import Charts from '@/src/statistics/Charts'
import DCCTrend from '@/src/statistics/DCCTrend'
import classNames from 'classnames'
import { BrowserView, MobileView } from '@/components/device-detect'
import Meta from '@/src/statistics/Meta'

import styles from './index.module.scss'
import ContractTrend from "@/src/statistics/ContractTrend";
import ContractGas from "@/src/statistics/contractGas";
import ContractAddr from "@/src/statistics/contractAddr";
import ContractCon from "@/src/statistics/contractCon";
import ContractBalance from "@/src/statistics/ContractBanlace";

export default () => {
  const { tr } = Translation({ ns: 'static' });
  const { hash } = useHash();

  // const [show, setShow] = useState(true);
  // const [lastScrollTop, setLastScrollTop] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // const ele = document.getElementsByClassName('header-fade-in');
  //     // console.log('---33', ele)
  //     // if (ele && ele.length > 0) {
  //     //   setShow(true)
  //     // } else {
  //     //   setShow(false)
  //     // }
  //     let st = window.pageYOffset || document.documentElement.scrollTop;
  //     console.log('99999ee', st, document.documentElement.scrollHeight, document.documentElement.clientHeight)
  //     let show = true;
  //     if (st > lastScrollTop) {
  //       show= false
  //     }
  //     setShow(show);
  //     if (show) {
  //       document.documentElement.scrollTop = st - 110;
  //     }
  //     setLastScrollTop(st <= 0 ? 0 : st);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [lastScrollTop]);

  // const [show, setShow] = useState(true);
  // const [lastScrollTop, setLastScrollTop] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // const ele = document.getElementsByClassName('header-fade-in');
  //     // console.log('---33', ele)
  //     // if (ele && ele.length > 0) {
  //     //   setShow(true)
  //     // } else {
  //     //   setShow(false)
  //     // }
  //     let st = window.pageYOffset || document.documentElement.scrollTop;
  //     console.log('99999ee', st, document.documentElement.scrollHeight, document.documentElement.clientHeight)
  //     let show = true;
  //     if (st > lastScrollTop) {
  //       show= false
  //     }
  //     setShow(show);
  //     if (show) {
  //       document.documentElement.scrollTop = st - 110;
  //     }
  //     setLastScrollTop(st <= 0 ? 0 : st);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [lastScrollTop]);

  const renderNavChildren = (itemChildren: Array<Menu_Info>) => {
    return <ul className="flex flex-col w-full" >
      {itemChildren.map((child:Menu_Info) => {
        return <Link key={child.key}
          href={`/statistics/charts#${child.key}`}
          scroll={false}
          className={`flex items-center text_des gap-x-2 p-2 w-full pl-10 text_color hover:!text-primary rounded-[5px] ${hash === child.key ? '!text-primary bg-bg_hover' : ''}`}>
          {tr(child?.title || child.key)}</Link>
      })}
    </ul>
  }
  return <div className={classNames(styles['statistics-charts'],"main_contain !overflow-auto")}>
    <div className={classNames("flex gap-x-5",styles.content)}>
      <BrowserView>
        <div className={ `${styles['static-menu']}`} >
          <div className='flex justify-center h-10 flex-col text-lg font-medium gap-y-2.5 mb-2.5 mx-2.5'>
            <span>{tr('static_overview')}</span>
          </div>
        </BrowserView>

        <MobileView>
          <div className={styles['nav-wrap']}>
            {chartsNav.map((value, index) => {
              return (
                <Link
                  className={
                    hash === value.key || (hash === '' && index == 0)
                      ? styles.active
                      : ''
                  }
                  key={value.key}
                  href={`/statistics/charts#${value.key}`}
                >
                  {tr(value.title || value.key)}
                </Link>
              )
            })}
          </div>
        </MobileView>

        <div
          className={classNames(
            'flex flex-1 flex-col gap-y-6',
            styles['tab-content'],
          )}
        >
          {!hash && <Meta />}
          {hash === 'networks' && <Meta />}
          {hash.includes('fevm') && (
            <>
              <div id="fevm_trend">
                <ContractTrend />
              </div>
              <div id="fevm_con">
                <ContractCon />
              </div>
              <div id="fevm_addr">
                <ContractAddr />
              </div>
              <div id="fevm_gas">
                <ContractGas />
              </div>
              <div id="fevm_balance">
                <ContractBalance />
              </div>
            </>
          )}
          {hash.includes('blockChain') && (
            <>
              <div id="blockChain_power">
                <PowerTrend />
              </div>
              <div id="blockChain_cc_dc_power">
                <DCCTrend />
              </div>
              <div id="blockChain_trend">
                <BlockRewardTrend />
              </div>
              <div id="blockChain_reward_per">
                <BlockRewardPer />
              </div>
              <div id="blockChain_nodes">
                <ActiveNodeTrend />
              </div>
            </>
          )}
          {hash === 'fil_overview' && (
            <>
              <FilChart />
              <Charts />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
