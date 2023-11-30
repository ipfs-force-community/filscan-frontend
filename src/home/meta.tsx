/** @format */

import { EvmContractSummary, apiUrl } from '@/contents/apiUrl'
import { Translation } from '@/components/hooks/Translation'
import { home_meta } from '@/contents/home'
import { useState } from 'react'
import styles from './style.module.scss'
import classNames from 'classnames'
import useAxiosData from '@/store/useAxiosData'
import Skeleton from '@/packages/skeleton'
import Tooltip from '@/packages/tooltip'
import useInterval from '@/components/hooks/useInterval'
import Link from 'next/link'
import { BrowserView, MobileView } from '@/components/device-detect'
import GoIcon from '@/assets/images/black_go.svg'
import GoMobileIcon from '@/assets/images/icon-right-white.svg'

type ElementType<T extends readonly any[]> =
  T extends readonly (infer ElementType)[] ? ElementType : never
type DataIndex = ElementType<typeof home_meta>['dataIndex']

type Item = ElementType<typeof home_meta>

function Meta() {
  const { tr } = Translation({ ns: 'home' })
  const { axiosData, loading } = useAxiosData()

  const [data, setData] = useState<
    Record<DataIndex, number | undefined> & {
      [key: string]: number | undefined
    }
  >()
  const [contractData, setContractData] = useState<Record<string, any>>()

  useInterval(
    () => {
      load()
    },
    5 * 60 * 1000,
  )

  const load = async () => {
    const data: any = await axiosData(apiUrl.home_meta)
    setData(data?.total_indicators || {})
    const result: any = await axiosData(EvmContractSummary)
    setContractData(result || {})
  }

  return (
    <>
      <div
        //ref={ref}
        style={{ overflow: 'hidden' }} //safari 不生效
        className={classNames(
          styles.meta,
          `card_shadow border_color relative inline-grid h-[270px] flex-1 grid-cols-4 items-center gap-2 overflow-hidden rounded-xl  border py-10 pl-10 pr-6`,
        )}
      >
        <Link
          href={`/statistics/charts#networks`}
          className="absolute right-2 top-5"
        >
          <MobileView>
            <GoMobileIcon width={28} height={28} />
          </MobileView>
          <BrowserView>
            <GoIcon className="mr-2.5 cursor-pointer" width={18} height={18} />
          </BrowserView>
        </Link>
        {home_meta.map((item: Item | any, index: number) => {
          const { render, dataIndex, title } = item
          const dataSource = { ...data, ...contractData }
          const value = (dataSource && dataSource[dataIndex]) || ''
          let renderDom = value
          let tipContent
          if (item.tipContent && Array.isArray(item.tipContent)) {
            tipContent = (
              <ul className="w-fit px-2 pt-2">
                {item.tipContent.map((tipItem: any) => {
                  let tipValue = dataSource[tipItem.dataIndex]
                  if (tipItem.render) {
                    tipValue = tipItem.render(tipValue, dataSource)
                  }
                  return (
                    <li key={tipItem.dataIndex} className="mb-2.5">
                      <span className="w-fit min-w-[80px]">
                        {tr(tipItem.title)}:
                      </span>
                      <span className="ml-1 w-fit">{tipValue}</span>
                    </li>
                  )
                })}
              </ul>
            )
          }
          if (data) {
            renderDom = render && render(value, { ...data, ...contractData })
          }
          if (item.tipContent) {
            return (
              <div
                className={`${styles['meta-item']} relative cursor-pointer`}
                key={item.dataIndex}
              >
                <Tooltip context={tipContent} icon={false}>
                  <div
                    className={classNames(
                      'text_clip DINPro-Bold text-xl	 font-bold',
                      styles['solid-text'],
                    )}
                  >
                    {loading && <Skeleton />}
                    {!loading && renderDom}
                  </div>
                </Tooltip>

                <div
                  className={classNames(
                    'text_des mt-1 flex items-center gap-x-1 font-PingFang text-xs',
                    styles.title,
                  )}
                >
                  {tr(title)}
                  {item.tip && <Tooltip context={tr(item.tip)} icon={true} />}
                </div>
              </div>
            )
          }
          return (
            <div className={styles['meta-item']} key={item.dataIndex}>
              <div
                className={classNames(
                  'text_clip DINPro-Bold text-xl	 font-bold',
                  styles['solid-text'],
                )}
              >
                {loading && <Skeleton />}
                {!loading && renderDom}
              </div>
              <div
                className={classNames(
                  'text_des mt-1 flex items-center gap-x-1 font-PingFang text-xs',
                  styles.title,
                )}
              >
                {tr(title)}
                {item.tip && <Tooltip context={tr(item.tip)} icon={true} />}
              </div>
            </div>
          )
        })}
      </div>
      <MobileView>
        <div className={classNames(styles['see-wrap'])}>
          <Link href={`/statistics/charts#networks`}>
            <div className={classNames(styles['see-more'])}>
              {tr('see_more')}
            </div>
          </Link>
        </div>
      </MobileView>
    </>
  )
}

export default Meta
