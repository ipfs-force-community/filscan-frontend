import { Translation } from '@/components/hooks/Translation'
import { apiUrl } from '@/contents/apiUrl'
import { defi_market } from '@/contents/fevm'
import useAxiosData from '@/store/useAxiosData'
import DefiList from '@/src/fevm/defi'
import { formatDateTime, get$Number } from '@/utils'
import { BrowserView, MobileView } from '@/components/device-detect'
import classNames from 'classnames'
import styles from './index.module.scss'
import Skeleton from '@/packages/skeleton'
import DefiLogo from '@/assets/images/defiLogo.svg'
import Image from 'next/image'
export default () => {
  const { data: defiData, loading } = useAxiosData(apiUrl.fevm_defiSummary)
  const { tr } = Translation({ ns: 'fevm' })

  return (
    <div className={classNames('main_contain', styles.wrap)}>
      <MobileView>
        <div>
          {defi_market
            .filter((value) => {
              return value.dataIndex === 'fevm_staked'
            })
            .map((value, index) => {
              const data = defiData && defiData[value.dataIndex]
              return (
                <div className={classNames(styles['staked-top'])} key={index}>
                  <div className={styles.content}>
                    <div className={styles.value}>{get$Number(data)}</div>
                    <div className={styles.title}>{tr(value.title)}</div>
                  </div>
                  <DefiLogo />
                </div>
              )
            })}
        </div>
        <div className={classNames(styles['staked-bottom'])}>
          {defi_market
            .filter((value) => {
              return value.dataIndex !== 'fevm_staked'
            })
            .map((value, index) => {
              const data = defiData && defiData[value.dataIndex]
              return (
                <div className={classNames(styles.content)} key={index}>
                  <div className={styles.value}>{get$Number(data)}</div>
                  <div className={styles.title}>{tr(value.title)}</div>
                </div>
              )
            })}
        </div>
      </MobileView>
      <BrowserView>
        <ul className="border_color card_shadow flex h-[104px] items-center rounded-xl border p-5">
          {defi_market.map((item) => {
            const { title, dataIndex, render } = item
            const value = defiData && defiData[dataIndex]
            const showValue = render ? render(value, defiData) : value
            return (
              <li
                className="border_color flex flex-1 items-center justify-center border-r last:border-0"
                key={item.dataIndex}
              >
                <span className="flex w-fit flex-col ">
                  <span className="text_des mb-2.5 font-DIN text-sm">
                    {tr(title)}
                  </span>
                  <span className="font-DINPro-Bold text-xl">
                    {loading ? <Skeleton /> : showValue}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
        <div className="mt-5">
          <span className="mx-2.5">
            <span className="font-DINPro-Bold text-lg ">
              {' '}
              {tr('defi_overview')}
            </span>
            {defiData?.updated_at && (
              <span className="text_des ml-2 text-xs">
                {tr('defi_list_time', {
                  value: formatDateTime(defiData?.updated_at),
                })}
              </span>
            )}
          </span>
          <DefiList />
        </div>
      </BrowserView>
      <MobileView>
        <DefiList />
      </MobileView>
    </div>
  )
}
