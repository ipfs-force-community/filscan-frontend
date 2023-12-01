/** @format */

import { apiUrl } from '@/contents/apiUrl'
import { Translation } from '@/components/hooks/Translation'
import Segmented from '@/packages/segmented'
import SkeletonScreen from '@/packages/skeleton'
import { getShowData } from '@/utils'
import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import classNames from 'classnames'
import Tooltip from '@/packages/tooltip'
import { getSvgIcon } from '@/svgsIcon'
import useAxiosData from '@/store/useAxiosData'

//统计指标

export default ({
  overView,
  accountId,
}: {
  overView: any
  accountId?: string | string[]
}) => {
  const { tr } = Translation({ ns: 'detail' })
  const { axiosData } = useAxiosData()
  const [interval, setInterval] = useState('24h')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  //   useColumnAlign('.overView', '.overView_item', 'last_item');

  useEffect(() => {
    if (accountId) {
      load()
    }
  }, [accountId])

  const load = async (inter?: string) => {
    setLoading(true)
    const show_inter = inter || interval
    const result: any = await axiosData(apiUrl.detail_Indicators, {
      account_id: accountId,
      filters: {
        interval: show_inter,
      },
    })
    setLoading(false)
    setData(result?.miner_indicators || {})
  }

  const handleTabChange = (value: string) => {
    setInterval(value)
    load(value)
  }

  return (
    <div className={classNames(styles.overview, 'w-full')}>
      <div
        className={classNames(
          'mb-5 ml-2.5 mt-7 flex w-full items-center',
          styles.title,
        )}
      >
        <span className="mr-5 text-lg font-semibold">{tr(overView.title)}</span>
        <Segmented
          data={overView.tabList}
          ns="detail"
          defaultValue={interval}
          isHash={false}
          onChange={handleTabChange}
        />
      </div>
      <ul
        className={classNames(
          styles.list,
          'card_shadow border_color grid h-[150px] gap-y-6 rounded-xl border p-5 px-5 py-7',
        )}
      >
        {overView?.list.map((item: any) => {
          const {
            render,
            dataIndex,
            style = {},
            width,
            title,
            title_tip,
          } = item
          const showData = getShowData(item, data)
          const value = render
            ? render(showData[dataIndex])
            : showData[dataIndex] || '--'
          //style={{ ...style }}
          return (
            <li
              key={dataIndex}
              className={classNames(styles['list-row'], 'flex')}
            >
              <span
                className={classNames(
                  'text_des min-w-20 flex flex-wrap text-sm',
                  styles.label,
                )}
              >
                {title_tip ? (
                  <Tooltip context={tr(title_tip)} icon={false}>
                    <span className="flex cursor-pointer items-center gap-x-1">
                      {tr(title)} {getSvgIcon('tip')}:
                    </span>
                  </Tooltip>
                ) : (
                  `${tr(title)} :`
                )}
              </span>
              <span className="font-HarmonyOS_Medium ml-1 text-sm font-medium">
                {loading ? <SkeletonScreen /> : value}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
