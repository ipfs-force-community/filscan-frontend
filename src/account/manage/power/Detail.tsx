/** @format */

import { Translation } from '@/components/hooks/Translation'
import Breadcrumb from '@/packages/breadcrumb'
import { useEffect, useMemo, useState } from 'react'
import { formatDateTime, getCalcTime } from '@/utils'
import ExportExcel from '@/packages/exportExcel'
import Table from '@/packages/Table'
import DateTime from '@/src/account/DateTIme'
import { account_power } from '@/contents/account'
import Tooltip from '@/packages/tooltip'
import manageStore from '@/store/modules/account/manage'
import { observer } from 'mobx-react'
import { BrowserView, MobileView } from '@/components/device-detect'
import styles from './Detail.module.scss'
import MTable from '@/packages/mobile/table'
import classNames from 'classnames'
import useWindow from '@/components/hooks/useWindown'

/** @format */

export default observer(
  ({
    miner,
    selectedKey,
  }: {
    miner?: string | number | null
    selectedKey: string
  }) => {
    const { tr } = Translation({ ns: 'account' })
    const { powerDetailData, powerDetailLoading } = manageStore
    const { isMobile } = useWindow()

    const routerItems = useMemo(() => {
      if (miner && typeof miner === 'string') {
        return [
          {
            title: tr('power'),
            path: '/account#power',
          },
          {
            title: <span>{miner}</span>,
            path: `/account#power?miner=${miner}`,
          },
        ]
      }
      return []
    }, [miner, tr])

    const [date, setDate] = useState({
      startTime: formatDateTime(getCalcTime(6), 'YYYY-MM-DDTHH:mm:ssZ'),
      endTime: formatDateTime(
        new Date().getTime() / 1000,
        'YYYY-MM-DDTHH:mm:ssZ',
      ),
    })

    useEffect(() => {
      if (miner) {
        load()
      }
    }, [miner])

    const load = (time?: Record<string, string>) => {
      const newDate = time || date
      if (miner) {
        const payload = {
          miner_id: miner,
          end_date: newDate.endTime || newDate.startTime,
          start_date: newDate.startTime,
        }
        manageStore.getPowerDetailData(payload)
      }
    }

    const columns = useMemo(() => {
      return account_power.columns(tr, 'detail').map((item) => {
        if (isMobile) {
          item.fixed = 'auto'
        }
        if (item.titleTip) {
          ;(item.excelTitle =
            item.dataIndex === 'sector_count_change'
              ? `${tr('raw_power')}/${tr('sector_power_count')}`
              : tr(item.title)),
            (item.title = (
              <span className="flex items-center gap-x-1">
                {tr(item.title)}
                <Tooltip context={tr(item.titleTip)} />
              </span>
            ))
        } else {
          item.title = tr(item.title)
        }
        return { ...item }
      })
    }, [tr])

    return (
      <div className={styles.wrap}>
        {routerItems && routerItems.length > 0 && (
          <Breadcrumb items={routerItems} />
        )}
        <BrowserView>
          <div className={styles['title-wrap']}>
            <div className="flex  flex-col">
              <span className="w-full font-HarmonyOS text-lg font-semibold	">
                {miner}
              </span>
              <span className="text_des text-xs">
                <span>{tr('last_time')}</span>
                <span className="ml-2">
                  {formatDateTime(
                    powerDetailData?.epoch_time,
                    'YYYY/MM/DD HH:mm',
                  )}
                </span>
              </span>
            </div>
            <div className="flex gap-x-2.5">
              <DateTime
                showEnd={true}
                defaultValue={[date.startTime, date.endTime]}
                onChange={(start, end) => {
                  load({
                    startTime: start,
                    endTime: end,
                  })
                  setDate({
                    startTime: start,
                    endTime: end,
                  })
                }}
              />
              <ExportExcel
                columns={columns}
                data={powerDetailData?.power_detail_list || []}
                fileName={tr(selectedKey) + miner ? String(miner) : ''}
              />
            </div>
          </div>
        </BrowserView>
        <MobileView>
          <div className={styles['title-wrap']}>
            <div className="flex  flex-col">
              <span className={styles.title}>{miner}</span>
              <span className={styles.time}>
                <span>{tr('last_time')}</span>
                <span className="ml-2">
                  {formatDateTime(
                    powerDetailData?.epoch_time,
                    'YYYY/MM/DD HH:mm',
                  )}
                </span>
              </span>
            </div>
            <div className={styles['date-time']}>
              <DateTime
                showEnd={true}
                defaultValue={[date.startTime, date.endTime]}
                onChange={(start, end) => {
                  load({
                    startTime: start,
                    endTime: end,
                  })
                  setDate({
                    startTime: start,
                    endTime: end,
                  })
                }}
              />
            </div>
          </div>
        </MobileView>
        <div
          className={classNames(
            'card_shadow border_color mt-5 overflow-auto rounded-xl border p-4',
            styles['table-wrap'],
          )}
        >
          <BrowserView>
            <Table
              data={powerDetailData?.power_detail_list || []}
              columns={columns}
              loading={powerDetailLoading}
            />
          </BrowserView>
          <MobileView>
            <MTable
              scroll={{ x: 'max-content' }}
              dataSource={powerDetailData?.power_detail_list || []}
              columns={columns}
              loading={powerDetailLoading}
            />
          </MobileView>
        </div>
      </div>
    )
  },
)
