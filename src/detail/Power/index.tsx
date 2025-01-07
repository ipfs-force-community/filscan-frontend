/** @format */

import { Translation } from '@/components/hooks/Translation'
import { power_list } from '@/contents/detail'
import SkeletonScreen from '@/packages/skeleton'
import { formatNumber, getShowData } from '@/utils'
import { useMemo } from 'react'
import { BrowserView, MobileView } from '@/components/device-detect'
import styles from './style.module.scss'
import classNames from 'classnames'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

export default observer(
  ({ data, loading }: { data: any; loading: boolean }) => {
    const { theme, lang } = filscanStore
    const { tr } = Translation({ ns: 'detail' })

    // const loading = useMemo(() => {
    //   if (data.hasOwnProperty('quality_power_percentage')) {
    //     return false
    //   }
    //   return true
    // }, [data])

    return (
      <div
        className={classNames(
          styles.pow,
          'border_color h-[280px]  w-1/2 border-l p-5',
        )}
      >
        <div className="border_color flex justify-between border-b pb-7">
          <ul className={classNames(styles.row, styles.between, 'flex flex-1')}>
            {power_list.header.map((headerItem) => {
              const { render, dataIndex, title } = headerItem
              const showData = getShowData(headerItem, data)
              const value = render
                ? render(showData[dataIndex])
                : showData[dataIndex] || '--'

              return (
                <li
                  className={classNames(
                    styles['row-item'],
                    'flex w-1/2 flex-col',
                  )}
                  key={dataIndex}
                >
                  <span
                    className={classNames('text_des text-sm', styles.label)}
                  >
                    {tr(title)}
                  </span>
                  <>
                    <BrowserView>
                      <span className="text_clip font-HarmonyOS_Bold text-xl">
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
              )
            })}
          </ul>
          {/* <BrowserView><Image src={powerIcon} alt='' width={41} height={41} /></BrowserView> */}
        </div>
        <ul
          className={classNames(
            styles.column,
            'mt-5 flex  max-h-[120px] flex-col flex-wrap justify-between gap-y-6',
          )}
        >
          {power_list.list.map((item) => {
            const { render, dataIndex, title } = item
            const showData = getShowData(item, data)
            const value = render
              ? render(showData[dataIndex])
              : showData[dataIndex] || '--'
            return (
              <li
                key={dataIndex}
                className={classNames(styles.full, 'flex-0 flex w-1/2')}
              >
                <span
                  className={classNames(
                    'text_des w-28 text-sm',
                    styles['label'],
                  )}
                >
                  {tr(title)}
                </span>
                <span className="font-HarmonyOS_Medium text-sm font-medium">
                  {loading ? <SkeletonScreen /> : value}
                </span>
              </li>
            )
          })}
        </ul>
        <div
          className={classNames(styles.status, 'mt-6 flex w-full items-center')}
        >
          <span className="text_des w-28 text-sm">{tr('sector_status')}</span>
          <span className="font-HarmonyOS_Medium text-sm font-medium">
            {loading ? (
              <SkeletonScreen />
            ) : (
              <ul
                className={classNames(
                  styles['status-row'],
                  'flex flex-1 gap-x-4',
                )}
              >
                {power_list.sector_status.renderList.map((sector_item: any) => {
                  const { dataIndex, title, color } = sector_item
                  const showData = getShowData(sector_item, data)
                  const value = showData[dataIndex]
                  return (
                    <li key={dataIndex} className="flex items-center gap-x-1">
                      <span
                        className={classNames(
                          'font-HarmonyOS_Medium text-sm font-medium',
                          styles['sector-status-value'],
                        )}
                        style={{ color: color }}
                      >
                        {formatNumber(value)}
                      </span>
                      <span
                        className={classNames(
                          'text_des text-sm',
                          styles['sector-status-title'],
                        )}
                      >
                        {tr(title)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
          </span>
        </div>
      </div>
    )
  },
)
